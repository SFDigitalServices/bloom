import * as React from "react"
import ImageCard from "@bloom-housing/ui-components/src/cards/ImageCard"
import { Listing } from "@bloom-housing/core"
import LinkButton from "@bloom-housing/ui-components/src/atoms/LinkButton"
import ListingSummaryTable from "./ListingSummaryTable"
import t from "@bloom-housing/ui-components/src/helpers/translator"
import "./ListingsListSf.scss"

export interface ListingsProps {
  listings: Listing[]
}

const ListingsListSf = (props: ListingsProps) => {
  const listings = props.listings

  const listItems = listings.map((listing: Listing) => {
    const imageUrl = listing.imageUrl || ""

    return (
      <article key={listing.id} className="listings-row">
        <div className="listings-row_figure">
          <ImageCard
            title={listing.name}
            imageUrl={imageUrl}
            href={`listing/id=${listing.id}`}
            as={`/listing/${listing.id}`}
            listing={listing}
          />
        </div>
        <div className="listings-row_content">
          <h4 className="listings-row_title">{t("listings.waitlist.open")}</h4>
          <div className="listings-row_table">
            {listing.unitsSummarized && (
              <ListingSummaryTable
                summaries={listing.unitsSummarized?.byNonReservedUnitType || []}
              />
            )}
          </div>
          <LinkButton
            href={`listing/id=${listing.id}`}
            as={`/listing/${listing.id}/${listing.urlSlug}`}
          >
            {t("label.seeDetails")}
          </LinkButton>
        </div>
      </article>
    )
  })

  return <>{listItems}</>
}

export { ListingsListSf as default, ListingsListSf }
