import { useQuery } from 'react-query'
import { getClasses } from '../utils/api'

export default function useClasses (params, options) {
  const queryKey = ['classes']
  if (params !== undefined) queryKey.push(params)
  return useQuery(queryKey, () => getClasses(params), options)
}
