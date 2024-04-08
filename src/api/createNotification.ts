import { fetchData } from "../configs/api"

interface Body {
  topics: number[],
  title: string,
  message: string
}

export const createNotification = async (
  body: Body,
  accessToken?: string
) => {
  await fetchData(accessToken).post('/notifications', body)
}
