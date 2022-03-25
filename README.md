# 👷 URL Shortener

This is a URL shortener that uses [Cloudflare Workers](https://www.cloudflare.com/workers/) to shorten URLs. It is powered by [Cloudflare Workers](https://www.cloudflare.com/workers/) and [Upstash](https://upstash.com/) Redis for storing data and Kafkar for storing the click events along with [Materialize](https://materialize.com/) for real-time data analytics.

Demo URL:

https://cf-url-shortener.bobbyiliev.workers.dev/admin

App structure:
- A serverless Cloudflare Worker that lets you add short links and redirect them to other URLs.
- All data is stored in Upstash serverless Redis cluster as key-value pairs (short link -> long link).
- Every time you visit a short link, it triggers an event and stores it in Upstash Kafka.
- We then get the data from Upstash Kafka and analyze it in Materialize.

Next steps:
- Build a UI for the data coming from Materialize.
- Add authentication to the app so that only admins can add links.

## Diagram

<img width="1325" alt="Diagram of Upstash and Materialize demo" src="https://user-images.githubusercontent.com/21223421/160150800-2d304712-13c1-4d15-910a-9f99b7b33771.png">

## Demo

![mz-upstash-demo](https://user-images.githubusercontent.com/21223421/160150872-58fca546-5a86-4132-8bb4-a989dc87ba83.gif)

## Running this demo

- Create a Redis cluster and a Kafka cluster in Upstash.
- Create a Kafka topic in Upstash called `visits-log`.
- Install the Cloudflare CLI tool called `wrangler` on your local machine as described [here](https://developers.cloudflare.com/workers/cli-wrangler/install-update/)
- Clone the repo:
```
git clone https://github.com/bobbyiliev/cf-url-shortener.git
```
- Access the directory:
```
cd cf-url-shortener
```
- Install the `npm` dependencies:
```
npm install
```
- Run the `wrangler` command to authenticate with Cloudflare:
```
wrangler login
```
- Then in the `wrangler.toml` file, update the `account_id` to match your Cloudflare account ID:
```
account_id = "YOUR_ACCOUNT_ID_HERE"
```
- Set the following secrets in Cloudflare using the `wrangler` tool:
```
wrangler secret put UPSTASH_REDIS_REST_URL
wrangler secret put UPSTASH_REDIS_REST_TOKEN
wrangler secret put UPSTASH_KAFKA_REST_URL
wrangler secret put UPSTASH_KAFKA_REST_USERNAME
wrangler secret put UPSTASH_KAFKA_REST_PASSWORD
```
> Make sure to use the REST API URLs and not the Broker details.
- Run the following command to deploy the CF Worker:
```
wrangler deploy
```

With the CF Worker deployed, you can visit the admin URL where you can add short links and redirect them to other URLs.

## Setup Materialize

Once you've deployed the CF Worker, you can setup Materialize to analyze the data in Upstash Kafka in real time.

Start by creating a new Materialize instance in Materialize Cloud:

- https://materialize.com/docs/cloud/get-started-with-cloud/

Or alternatively, you can install Materialize locally:

- https://materialize.com/docs/install/

After you've created the instance, you can connect to it using the `psql` command as shown in the docs.

### Kafka sources

Next, create a new Kafka source in Materialize:

```sql
CREATE SOURCE click_stats
  FROM KAFKA BROKER 'UPSTASH_KAFKA_BROKER_URL' TOPIC 'visits-log'
  WITH (
      security_protocol = 'SASL_SSL',
      sasl_mechanisms = 'SCRAM-SHA-256',
      sasl_username = 'UPSTASH_KAFKA_BROKER_USERNAME',
      sasl_password = 'UPSTASH_KAFKA_BROKER_PASSWORD'
  )
FORMAT BYTES;
```

> Change the Kafka details to match your Upstash Kafka cluster Broker and credentials.

Create a view:

```sql
CREATE VIEW click_stats_v AS
    SELECT
        *
    FROM (
        SELECT
            (data->>'shortCode')::string AS short_code,
            (data->>'longUrl')::string AS long_url,
            (data->>'country')::string AS country,
            (data->>'city')::string AS city,
            (data->>'ip')::string AS ip
        FROM (
            SELECT CAST(data AS jsonb) AS data
            FROM (
                SELECT convert_from(data, 'utf8') AS data
                FROM click_stats
            )
        )
    );
```

Create a materialized view to analyze the data in the Kafka source:

```sql
CREATE MATERIALIZED VIEW click_stats_m AS
    SELECT
        *
    FROM click_stats_v;
```

Query the materialized view:

```sql
SELECT * FROM click_stats_m;
```

Order by the number of clicks per short link:

```sql
CREATE MATERIALIZED VIEW order_by_clicks AS
    SELECT
        short_code,
        COUNT(*) AS clicks
    FROM click_stats_m
    GROUP BY short_code;
```

Stream the data from the materialized view using `TAIL`:

```sql
COPY ( TAIL ( SELECT * FROM order_by_clicks ) ) TO STDOUT;
```

### Kafka sink:

```sql
CREATE SINK stats_sink
    FROM click_stats_m
    INTO KAFKA BROKER 'UPSTASH_KAFKA_BROKER_URL' TOPIC 'stats-sink'
    WITH (
      security_protocol = 'SASL_SSL',
      sasl_mechanisms = 'SCRAM-SHA-256',
      sasl_username = 'UPSTASH_KAFKA_BROKER_USERNAME',
      sasl_password = 'UPSTASH_KAFKA_BROKER_PASSWORD'
    )
    FORMAT AVRO USING SCHEMA '{
        "type": "record",
        "name": "envelope",
        "fields": { "name": "data", "type": "bytes" }
    }';
```