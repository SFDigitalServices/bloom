import axios from "axios"
import { dahliaToBloomListing } from "./listing_transformations"

export default async (listingId: string) => {
  let rawListing
  try {
    const response = await axios.get(`https://housing.sfgov.org/api/v1/listings/${listingId}`)
    rawListing = response.data.listing
  } catch (error) {
    console.log(error)
  }

  return dahliaToBloomListing(rawListing)
}
