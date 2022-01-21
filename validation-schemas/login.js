import * as Yup from 'yup'
import httpErrors from '../httpErrors.json'

const schema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_.]+$/, {
      excludeEmptyString: true,
      message: httpErrors[103]
    })
    .min(3, httpErrors[101])
    .max(50, httpErrors[102])
    .required(httpErrors[100]),
  password: Yup.string()
    .min(4, httpErrors[111])
    .max(128, httpErrors[112])
    .required(httpErrors[110]),
  type: Yup.string().required(httpErrors[120])
})

export default schema
