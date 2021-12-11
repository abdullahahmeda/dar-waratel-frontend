import * as Yup from 'yup'
import httpErrors from '../httpErrors.json'

const schema = Yup.object({
  name: Yup.string().required(httpErrors[200]),
  username: Yup.string().matches(/^[a-zA-Z0-9_.]+$/, { excludeEmptyString: true, message: httpErrors[213] }).min(3, httpErrors[211]).max(50, httpErrors[212]).required(httpErrors[210]),
  password: Yup.string().min(4, httpErrors[221]).max(128, httpErrors[222]).required(httpErrors[220]),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], httpErrors[226]).required(httpErrors[225]),
  phone: Yup.string().required(httpErrors[230]),
  address: Yup.string()
})

export default schema
