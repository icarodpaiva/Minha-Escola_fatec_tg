import { fetchData } from "../configs/api"

interface Body {
  name: string
  description: string
}

export const updateClassDetails = async (
  id: number,
  body: Body,
  accessToken?: string
) => {
  await fetchData(accessToken).patch(`/classes/${id}/details`, body)
}
