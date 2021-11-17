import * as Yup from 'yup'
import apiErrors from '../locales/errors/ar.json'

const schema = Yup.object({
  name: Yup.string().required(),
  guardian: Yup.object().required()
})

export default schema
