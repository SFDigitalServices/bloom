import axios from "axios"
import { dahliaToBloomListing } from "./listing_transformations"

export default async () => {
  let rawListings = []
  try {
    const response = await axios.get("https://housing.sfgov.org/api/v1/listings?type=rental")
    rawListings = response.data.listings
  } catch (error) {
    console.log(error)
  }
  const listings = rawListings.map(dahliaToBloomListing)
  return listings
}
