import * as Yup from 'yup'
import apiErrors from '../locales/errors/ar.json'

const schema = Yup.object({
  username: Yup.string().matches(/^[a-zA-Z0-9_.]+$/, { excludeEmptyString: true, message: apiErrors[103] }).min(3, apiErrors[101]).max(50, apiErrors[102]).required(apiErrors[100]),
  password: Yup.string().min(4, apiErrors[111]).max(128, apiErrors[112]).required(apiErrors[110]),
  type: Yup.string().required(apiErrors[120])
})

export default schema
