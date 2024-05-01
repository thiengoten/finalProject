import * as yup from 'yup'

const productSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
})
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim,
      'Please enter a valid email address',
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8)
    .max(12)
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,12}$/gim,
      'password contain 8 to 12 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})
export { productSchema, loginSchema }
