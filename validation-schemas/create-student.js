import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required(),
  guardian: Yup.object().required()
})

export default schema
