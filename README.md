# 👷 `mz-url-shortener` CF Worker

Admin URL:

https://cf-url-shortener.bobbyiliev.workers.dev/admin

Structure:
- A serverless Cloudflare Worker that lets you add short links and redirect them to other URLs.
- All data is stored in Upstash serverless Redis cluster as key-value pairs (short link -> long link).
- Every time you visit a short link, it triggers an event and stores it in Upstash Kafka.
- We then get the data from Upstash Kafka and analyze it in Materialize.

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
CREATE SOURCE stats
  FROM KAFKA BROKER 'UPSTASH_KAFKA_REST_URL' TOPIC 'visits-log'
  WITH (
      security_protocol = 'SASL_SSL',
      sasl_mechanisms = 'SCRAM-SHA-256',
      sasl_username = 'UPSTASH_KAFKA_REST_USERNAME',
      sasl_password = 'UPSTASH_KAFKA_REST_PASSWORD'
  )
FORMAT BYTES;
```

> Change the Kafka details to match your Upstash Kafka cluster REST API URL and credentials.

Create a view:

```sql
CREATE VIEW stats_v AS
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
                FROM stats
            )
        )
    );
```

Create a materialized view to analyze the data in the Kafka source:

```sql
CREATE MATERIALIZED VIEW stats_m AS
    SELECT
        *
    FROM stats_v;
```

Query the materialized view:

```sql
SELECT * FROM stats_m;
```

### Kafka sink:

```sql
CREATE SINK stats_sink
    FROM stats_v
    INTO KAFKA BROKER 'UPSTASH_KAFKA_REST_URL' TOPIC 'stats-sink'
    WITH (
      security_protocol = 'SASL_SSL',
      sasl_mechanisms = 'SCRAM-SHA-256',
      sasl_username = 'UPSTASH_KAFKA_REST_USERNAME',
      sasl_password = 'UPSTASH_KAFKA_REST_PASSWORD'
    )
    FORMAT AVRO USING SCHEMA '{
        "type": "record",
        "name": "envelope",
        "fields": { "name": "data", "type": "bytes" }
    }';
```