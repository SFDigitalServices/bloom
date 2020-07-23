import axios from "axios"
import { camelCase } from "lodash"

type AnyDict = { [key: string]: any }

// Transform SF DAHLIA formatted listing into core/bloom format

const camelCaseKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelCaseKeys(v))
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelCaseKeys(obj[key]),
      }),
      {}
    )
  }
  return obj
}

export const dahliaToBloomListing = (dahliaListing: AnyDict): AnyDict => {
  console.log("dahlia listing", dahliaListing)
  const bloomListing = camelCaseKeys(dahliaListing) as AnyDict
  console.log("bloom listing?", bloomListing)
  return bloomListing
}

export default async () => {
  let rawListings = []
  try {
    const response = await axios.get("https://housing.sfgov.org/api/v1/listings?type=rental")
    // console.log("response listings", response.data.listings)
    rawListings = response.data.listings
  } catch (error) {
    console.log("error was raised")
    console.log(error)
  }

  const listings = rawListings.map(dahliaToBloomListing)
  return listings
}
