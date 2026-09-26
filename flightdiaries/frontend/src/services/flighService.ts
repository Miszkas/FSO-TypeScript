import axios from 'axios'
import { type FlightSchema, type NewFlight } from '../types'

const baseUrl = '/api/diaries'

const getAll = async () => {
  const response = await axios.get<FlightSchema[]>(baseUrl)
  return response.data
}

const create = async (newObject: NewFlight) => {
  const response = await axios.post<FlightSchema>(baseUrl, newObject)
  return response.data
}

export default { getAll, create }