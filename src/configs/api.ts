import axios from "axios"

const baseURL = "/students"

export const fetchData = (accessToken: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    }
  })
}
