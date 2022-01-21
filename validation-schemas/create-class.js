import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required(),
  students: Yup.array()
    .min(1)
    .required()
})

export default schema
