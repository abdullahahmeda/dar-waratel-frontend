import { useQuery } from 'react-query'
import { getGuardians } from '../utils/api'

export default function useGuardians (params, options) {
  const queryKey = ['guardians']
  if (params !== undefined) queryKey.push(params)
  return useQuery(queryKey, () => getGuardians(params), options)
}
