import {
  ApplicationsService,
  ListingsService,
  serviceOptions,
} from "@bloom-housing/backend-core/types"
import { useAuthenticatedClient } from "./useAuthenticatedClient"
import { createContext, createElement, FunctionComponent, useContext } from "react"
import axiosStatic from "axios"
import { ConfigContext } from "../config/ConfigContext"

type ContextProps = {
  applicationsService: ApplicationsService
  listingsService: ListingsService
}

export const ApiClientContext = createContext<Partial<ContextProps>>({})
export const ApiClientProvider: FunctionComponent = ({ children }) => {
  const { apiUrl } = useContext(ConfigContext)
  const authClient = useAuthenticatedClient()
  serviceOptions.axios =
    authClient ||
    axiosStatic.create({
      baseURL: apiUrl,
    })

  return createElement(
    ApiClientContext.Provider,
    {
      value: {
        applicationsService: new ApplicationsService(),
        listingsService: new ListingsService(),
      },
    },
    children
  )
}
