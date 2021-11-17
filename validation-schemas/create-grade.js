import * as Yup from 'yup'
import apiErrors from '../locales/errors/ar.json'

const schema = Yup.object({
  grades: Yup.array(Yup.object({
    name: Yup.string().required(),
    type: Yup.string().required(),
    grade: Yup.string()
  })).required().min(1)
})

export default schema
