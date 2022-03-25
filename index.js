import { Router } from 'itty-router'
import { Redis } from "@upstash/redis/cloudflare"
import { Kafka } from "@upstash/kafka"

import { urlSaveForm, homePage } from './templates'
import { rawHtmlResponse, readRequestBody } from './functions'

// Create a new router
const router = Router()
const redis = Redis.fromEnv()

/*
Index route - Landing page
*/
router.get("/", () => {
  return rawHtmlResponse(homePage);
})

/*
Admin route - URL form
*/
router.get("/admin", async () => {
  return rawHtmlResponse(urlSaveForm);
})

/*
API route to return all keys and values in Redis
*/
router.get("/admin/urls", async () => {
  const keys = await redis.keys("*")
  // For each key get value
  const values = await Promise.all(keys.map(async (key) => {
    let value = await redis.get(key)
    return { key, value }
  }))
  return rawHtmlResponse(JSON.stringify(values))

})

/*
Short codes redirects
*/
router.get("/s/:url", async (request) => {
  console.log("START")
  const kafka = new Kafka({
    url: UPSTASH_KAFKA_REST_URL,
    username: UPSTASH_KAFKA_REST_USERNAME,
    password: UPSTASH_KAFKA_REST_PASSWORD,
  })
  const { params, query } = request

  // Get value from Redis for short code
  const value = await redis.get(params.url);
  // If value is not found return 404
  if (!value) {
    return new Response("Not found", { status: 404 })
  } else {
    // If value is found return 302 redirect and store event in Kafka
    let country = request.cf.country
    let city = request.cf.city
    let ip = request.headers.get('cf-connecting-ip') || 'unknown'

    let message = {
      shortCode: params.url,
      longUrl: value,
      country: country,
      city: city,
      ip: ip,
    }

    const p = kafka.producer()
    p.produce("visits-log", message)

    return new Response("", { status: 302, headers: { "Location": value } });
  }

})

/*
Save route - Save URL to Upstash Redis
*/
router.post("/admin/store", async request => {
  const reqBody = await readRequestBody(request);
  const body = await JSON.parse(reqBody);

  try {
    //const data = await redis.set('urls', '{ "longUrl": "' + body.longUrl + '" , "shortCode": "' + body.shortCode + '" }');
    const data = await redis.set(body.shortCode, body.longUrl);
    console.log(data);
    // Redirect to /admin
    return new Response("", { status: 302, headers: { "Location": "/admin" } });
  } catch (error) {
    return new Response(error);
  }
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})