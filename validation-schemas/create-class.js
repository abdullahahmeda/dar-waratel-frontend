import * as Yup from 'yup'
import apiErrors from '../locales/errors/ar.json'

const schema = Yup.object({
  name: Yup.string().required(),
  students: Yup.array().min(1).required()
})

export default schema
