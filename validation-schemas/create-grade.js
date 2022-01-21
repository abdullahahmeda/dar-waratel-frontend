import * as Yup from 'yup'

const schema = Yup.object({
  grades: Yup.array(
    Yup.object({
      name: Yup.string().required(),
      type: Yup.string().required(),
      grade: Yup.string()
    })
  )
    .required()
    .min(1)
})

export default schema
