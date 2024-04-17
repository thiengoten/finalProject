import * as yup from 'yup'

const productSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
  })

export { productSchema }
