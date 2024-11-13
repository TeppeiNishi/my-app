import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Request failed with status:', error.response.status)
    } else if (error.request) {
      console.error('Request failed:', error.request)
    } else {
      console.error('Request failed:', error.message)
    }

    return Promise.reject(new Error(error))
  },
)

export { apiClient }
