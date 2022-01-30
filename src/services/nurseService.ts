import { API_URL_NURSE } from '../api/api'
import instance from '../api/instance'
import { UserType } from '../interfaces/dataTypes'

const getNurse = (id: string) => instance.get(`${API_URL_NURSE}${id}`)

const getNurseProfile = () => instance.get(`${API_URL_NURSE}profile`)

const updateNurseProfile = (data: UserType) =>
  instance.put(`${API_URL_NURSE}`, data)

export default { getNurse, getNurseProfile, updateNurseProfile }
