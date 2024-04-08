import axios from "axios"

const baseURL = "https://minha-escola-backend-fatec-tg.vercel.app/app"

export const fetchData = (accessToken?: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    }
  })
}
