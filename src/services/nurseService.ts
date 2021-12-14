import axios from 'axios'

const API_URL_NURSE = 'http://localhost:8081/nurse/'

const getNurse = (id: string) => axios.get(`${API_URL_NURSE}${id}`)

export default { getNurse }
