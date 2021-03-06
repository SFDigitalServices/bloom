import React, { useEffect, useState, Fragment, useContext } from "react"
import Head from "next/head"
import {
  ApiClientContext,
  DashBlock,
  DashBlocks,
  HeaderBadge,
  LinkButton,
  MetaTags,
  RequireLogin,
  t,
  UserContext,
} from "@bloom-housing/ui-components"
import Layout from "../../layouts/application"
import { PaginatedApplication } from "@bloom-housing/backend-core/types"
import { AppStatusItemWrapper } from "./AppStatusItemWrapper"

export default () => {
  const { applicationsService } = useContext(ApiClientContext)
  const { profile } = useContext(UserContext)
  const [applications, setApplications] = useState<PaginatedApplication>()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (profile) {
      applicationsService
        .list({ userId: profile.id })
        .then((apps) => {
          setApplications(apps)
        })
        .catch((err) => {
          console.error(`Error fetching applications: ${err}`)
          setError(`${err}`)
        })
    }
  }, [profile, applicationsService])

  const noApplicationsSection = () => {
    return error ? (
      <div className="p-8">
        <h2 className="pb-4">{`${t("account.errorFetchingApplications")}`}</h2>
      </div>
    ) : (
      <div className="p-8">
        <h2 className="pb-4">{t("account.noApplications")}</h2>
        <LinkButton href="/listings">{t("listings.browseListings")}</LinkButton>
      </div>
    )
  }

  return (
    <>
      <RequireLogin signInPath="/sign-in" signInMessage={t("t.loginIsRequired")}>
        <Layout>
          <Head>
            <title>{t("nav.myApplications")}</title>
          </Head>
          <MetaTags title={t("nav.myApplications")} description="" />
          <section className="bg-gray-300">
            <div className="flex flex-wrap relative max-w-3xl mx-auto md:py-8">
              <DashBlocks>
                <DashBlock title={t("account.myApplications")} icon={<HeaderBadge />}>
                  <Fragment>
                    {applications &&
                      applications.items.length > 0 &&
                      applications.items.map((application, index) => (
                        <AppStatusItemWrapper key={index} application={application} />
                      ))}
                  </Fragment>
                  {!applications && noApplicationsSection()}
                </DashBlock>
              </DashBlocks>
            </div>
          </section>
        </Layout>
      </RequireLogin>
    </>
  )
}
