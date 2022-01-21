import { useQuery } from 'react-query'
import { getStudents } from '../utils/api'

export default function useStudents (params, options) {
  const queryKey = ['students']
  if (params !== undefined) queryKey.push(params)
  return useQuery(queryKey, () => getStudents(params), options)
}
