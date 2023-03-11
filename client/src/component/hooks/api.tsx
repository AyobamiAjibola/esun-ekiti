import axios from "../../interceptor/axios"

export const getChief = async (pageParam = 1, options = {}) => {
  const response = await axios.get(`council/fetch_chief?page=${pageParam}`, options)
  return response.data
}
