import axios from "axios"

const baseURL = "http://192.168.1.4:3001/students"

export const fetchData = (accessToken: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    }
  })
}
