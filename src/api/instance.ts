import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from './api'

const instanceConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
}

const exists = localStorage.getItem('jwt')
const jwt = exists ? JSON.parse(exists || '') : ''

// if (jwt && instanceConfig.headers) {
//   instanceConfig.headers.Authorization = `Bearer "${jwt}"`
// }

const instance = axios.create(instanceConfig)
instance.defaults.headers.common['Authorization'] = `Bearer "${jwt}"`

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => err,
)

console.log(jwt)
console.log(instance.defaults.headers.common)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    const originalConfig = err.config
    if (err?.response?.status === 401) {
      instance.defaults.headers.common.Authorization = ''
      return instance
        .post(
          `/account/auth/refresh/token`,
          JSON.parse(localStorage.getItem('refreshToken') || ''),
          {
            headers: {
              'Content-Type': 'text/plain',
              Authorization: '',
            },
          },
        )
        .then((res) => {
          localStorage.setItem('token', JSON.stringify(res?.data?.token))
          Object.assign(instance.defaults, {
            headers: {
              ...instance.defaults.headers,
              common: {
                ...instance.defaults.headers.common,
                Authorization: `Bearer ${res?.data?.token}`,
              },
            },
          })
          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${res?.data?.token}`
          }
          return instance(originalConfig)
        })
        .catch((error) => {
          localStorage.clear()
          instance.defaults.headers.common.Authorization = ''
          Promise.reject(error)
        })
    }

    if (err.response?.status === 404) {
      toast.error(err.response?.data?.message)
    } else if (err.response?.status === 500) {
      toast.error('Internal server error')
    } else if (err?.message === 'Network Error') {
      toast.error('Network Error')
    } else return Promise.reject(err)
    return null
  },
)

export default instance
