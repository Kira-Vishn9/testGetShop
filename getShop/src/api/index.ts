import Axios from 'axios'

export { type AxiosResponse } from 'axios'
export const httpClient = Axios.create({
  baseURL: 'http://apilayer.net/api/',
  withCredentials: true
})

httpClient.interceptors.response.use((axiosResponse) => axiosResponse.data)
