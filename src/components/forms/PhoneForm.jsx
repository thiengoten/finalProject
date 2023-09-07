import { LockIcon } from '@/assets/LockIcon'
import { MessageIcon } from '@/assets/MessageIcon'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Link } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?:\+?(?:84|0))(?:\d{9}|\d{2}-\d{7}|\d{3}-\d{6}|\d{4}-\d{5})$/g,
      'Please enter a valid Viet Nam phone number',
    )
    .required('Phone number is required'),
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
const PhoneForm = ({ isHandsUpInput }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (result) => {
    console.log(result)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Phone"
            placeholder="Enter your phone number"
            type="text"
            startContent={
              <MessageIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            color={fieldState.invalid ? 'error' : 'default'}
            validationState={fieldState.invalid ? 'invalid' : 'valid'}
            errorMessage={fieldState.invalid ? fieldState.error?.message : ''}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Password"
            placeholder="Enter your password"
            type="password"
            startContent={
              <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            color={fieldState.invalid ? 'error' : 'default'}
            validationState={fieldState.invalid ? 'invalid' : 'valid'}
            errorMessage={fieldState.invalid ? fieldState.error?.message : ''}
            onFocus={() => {
              isHandsUpInput.value = true
            }}
            onBlur={() => {
              isHandsUpInput.value = false
            }}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            startContent={
              <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            color={fieldState.invalid ? 'error' : 'default'}
            validationState={fieldState.invalid ? 'invalid' : 'valid'}
            errorMessage={fieldState.invalid ? fieldState.error?.message : ''}
          />
        )}
      />
      <Button className="mt-4" color="secondary" type="submit">
        Sign up
      </Button>
    </form>
  )
}

export default PhoneForm
