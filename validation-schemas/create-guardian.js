import * as Yup from 'yup'
import apiErrors from '../locales/errors/ar.json'

const schema = Yup.object({
  name: Yup.string().required(apiErrors[200]),
  username: Yup.string().matches(/^[a-zA-Z0-9_.]+$/, { excludeEmptyString: true, message: apiErrors[213] }).min(3, apiErrors[211]).max(50, apiErrors[212]).required(apiErrors[210]),
  password: Yup.string().min(4, apiErrors[221]).max(128, apiErrors[222]).required(apiErrors[220]),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], apiErrors[226]).required(apiErrors[225]),
  phone: Yup.string().required(apiErrors[230]),
  address: Yup.string()
})

export default schema
