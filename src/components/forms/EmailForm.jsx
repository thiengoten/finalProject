import { Controller, useForm } from 'react-hook-form'
import { LockIcon } from '@/assets/LockIcon'
import { MailIcon } from '@/assets/MailIcon'
import { supabase } from '@/config/supabaseClient'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
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
const EmailForm = ({ isHandsUpInput }) => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (result) => {
    const { email, password } = result

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('🚀 ~ onSubmit ~ data:', data)

    if (error) return console.log(error)

    // setTimeout(() => {
    //   setTimeout(() => {
    //     navigate('/', {
    //       replace: true,
    //     })
    //   }, 1000)
    // }, 2000)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Email"
            placeholder="Enter your email"
            size="md"
            startContent={
              <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
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
        render={({ field, fieldState }) => {
          return (
            <Input
              {...field}
              label="Password"
              placeholder="Enter your password"
              size="md"
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
          )
        }}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Input
              {...field}
              label="Confirm Password"
              placeholder="Confirm your password"
              size="md"
              startContent={
                <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
              color={fieldState.invalid ? 'error' : 'default'}
              validationState={fieldState.invalid ? 'invalid' : 'valid'}
              errorMessage={fieldState.invalid ? fieldState.error?.message : ''}
            />
          )
        }}
      />
      <Button className="mt-4" color="secondary" type="submit">
        Sign up
      </Button>
    </form>
  )
}

export default EmailForm
