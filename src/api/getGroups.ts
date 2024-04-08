import { fetchData } from "../configs/api"

export interface Group {
  id: number
  name: string
  subject: string
}

export const getGroups = async (accessToken?: string) => {
  const { data } = await fetchData(accessToken).get<Group[]>("/groups")

  return data
}
