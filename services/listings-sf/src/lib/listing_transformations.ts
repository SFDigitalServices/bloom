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
  const bloomListing = camelCaseKeys(dahliaListing) as AnyDict
  bloomListing.buildingAddress = {
    city: bloomListing.buildingCity,
    state: bloomListing.buildingState,
    street: bloomListing.buildingStreetAddress,
    zipCode: bloomListing.buildingZipCode,
  }
  bloomListing.rentalHistory = bloomListing.evictionHistory
  bloomListing.creditHistory = bloomListing.creditRating
  bloomListing.attachments = []

  return bloomListing
}
