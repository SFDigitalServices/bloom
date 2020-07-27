import Application from "koa"
import Router from "koa-router"
import cors from "@koa/cors"
import dotenv from "dotenv"
import jp from "jsonpath"
import { Listing } from "@bloom-housing/core"
import listingsLoader from "./lib/listings_loader"
import listingLoader from "./lib/listing_loader"
import { listingUrlSlug } from "./lib/url_helper"
import { amiCharts } from "./lib/ami_charts"

dotenv.config({ path: ".env" })

const config = {
  port: parseInt(process.env.PORT || "3001", 10),
}

const router = new Router()

const app = new Application()

// TODO: app.use(logger(winston));
app.use(cors())

router.get("/", async (ctx) => {
  let listings = (await listingsLoader()) as Listing[]
  if (ctx.request.query.jsonpath) {
    // e.g. http://localhost:3001/?jsonpath=%24%5B%3F(%40.applicationAddress.city%3D%3D%22San+Jose%22)%5D
    listings = jp.query(listings, ctx.request.query.jsonpath)
  }

  // Transform all the listings
  listings.forEach((listing) => {
    listing.urlSlug = listingUrlSlug(listing)
  })

  const data = {
    status: "ok",
    listings: listings,
    amiCharts: amiCharts,
  }

  ctx.body = data
})

router.get("/listings/:id", async (ctx) => {
  const listingId = ctx.params.id
  const listing = (await listingLoader(listingId)) as Listing
  listing.urlSlug = listingUrlSlug(listing)

  const data = {
    status: "ok",
    listing: listing,
    amiCharts: amiCharts,
  }

  ctx.body = data
})

app.use(router.routes())
export default app.listen(config.port)
console.log(`Server running on port ${config.port}`)
