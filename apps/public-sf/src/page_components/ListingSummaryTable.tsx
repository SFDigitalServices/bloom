import * as React from "react"
import { nanoid } from "nanoid"
import { UnitSummary } from "@bloom-housing/core"
import { Row } from "@bloom-housing/ui-components/src/tables/BasicTable"
import { Desktop, Mobile } from "@bloom-housing/ui-components/src/responsive/ResponsiveWrappers"
import t from "@bloom-housing/ui-components/src/helpers/translator"
import "./ListingSummaryTable.scss"

const getAlignClass = (align: "left" | "right") => `text-${align}`
const getUnitTypeString = (unitTypeKey: string) => t(`listings.unitTypes.${unitTypeKey}`)

interface HeaderCellProps {
  children: any
  align: "left" | "right"
}

const HeaderCell = ({ children, align }: HeaderCellProps) => {
  const classes = ["listing-summary-header-text", getAlignClass(align)]

  return <th className={classes.join(" ")}>{children}</th>
}

HeaderCell.defaultProps = {
  align: "left",
} as Partial<HeaderCellProps>

interface CellProps {
  children: any
  align: "left" | "right"
}

const Cell = ({ children, align }: CellProps) => {
  const classes = ["summary-text-regular", getAlignClass(align)]

  return <td className={classes.join(" ")}>{children}</td>
}

Cell.defaultProps = {
  align: "left",
} as Partial<CellProps>

interface RowProps {
  summary: UnitSummary
}

const ListingSummaryTableRow = (props: RowProps) => {
  const { summary } = props

  return (
    <Row className="listing-summary-row">
      <Cell>{getUnitTypeString(summary.unitType)}</Cell>
      <Cell>
        <div>{summary.totalAvailable}</div>
        <div className="summary-text-tiny">{"available"}</div>
      </Cell>
      <Cell align="right">{`${summary.rentRange.min} - ${summary.rentRange.max}`}</Cell>
    </Row>
  )
}

const ListingSummaryTableRowMobile = (props: RowProps) => {
  const { summary } = props

  return (
    <>
      <Row className="listing-summary-row">
        <HeaderCell>{t("t.unitType")}</HeaderCell>
        <Cell align="right">{getUnitTypeString(summary.unitType)}</Cell>
      </Row>
      <Row className="listing-summary-row">
        <HeaderCell>{t("t.availability")}</HeaderCell>
        <Cell align="right">{summary.totalAvailable}</Cell>
      </Row>
      <Row className="listing-summary-row">
        <HeaderCell>{t("t.rent")}</HeaderCell>
        <Cell align="right">{`${summary.rentRange.min} - ${summary.rentRange.max}`}</Cell>
      </Row>
    </>
  )
}

const ListingSummaryHeaderRow = () => {
  return (
    <Row className="listing-summary-row">
      <HeaderCell>{t("t.unitType")}</HeaderCell>
      <HeaderCell>{t("t.availability")}</HeaderCell>
      <HeaderCell align="right">{t("t.rent")}</HeaderCell>
    </Row>
  )
}

export interface ListingSummaryTableProps {
  summaries: UnitSummary[]
}

const ListingSummaryTable = (props: ListingSummaryTableProps) => {
  const { summaries } = props

  const tableClasses = ["table-listing-summary", "w-full", "text-sm"]

  return (
    <div style={{ overflowX: "auto" }}>
      <table className={tableClasses.join(" ")}>
        <Desktop>
          <thead>
            <ListingSummaryHeaderRow />
          </thead>
          <tbody>
            {summaries.map((summary) => (
              <ListingSummaryTableRow key={nanoid()} summary={summary} />
            ))}
          </tbody>
        </Desktop>
        <Mobile>
          {summaries.map((summary) => (
            <ListingSummaryTableRowMobile key={nanoid()} summary={summary} />
          ))}
        </Mobile>
      </table>
    </div>
  )
}

export default ListingSummaryTable
