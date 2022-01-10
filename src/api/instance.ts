import axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from './api'

const instanceConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
}

const jwt = localStorage.getItem('jwt')
  ? JSON.parse(localStorage.getItem('jwt') || '')
  : ''

if (jwt && instanceConfig.headers) {
  instanceConfig.headers.Authorization = `Bearer "${jwt}"`
}

const instance = axios.create(instanceConfig)

export default instance
