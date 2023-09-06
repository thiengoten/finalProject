import { LockIcon } from '@/assets/LockIcon'
import { MailIcon } from '@/assets/MailIcon'
import { MessageIcon } from '@/assets/MessageIcon'
import { supabase } from '@/config/db/supabaseClient'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

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
const SignUp = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const { rive, RiveComponent } = useRive({
    src: 'login-test.riv',
    autoplay: true,
    stateMachines: 'Login Machine',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  })

  const isHandsUpInput = useStateMachineInput(
    rive,
    'Login Machine',
    'isHandsUp',
  )
  const trigSuccessInput = useStateMachineInput(
    rive,
    'Login Machine',
    'trigSuccess',
  )
  const onSubmit = async (result) => {
    const { email, password } = result

    // let { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // })

    // if (error) return console.log(error)

    setTimeout(() => {
      trigSuccessInput.fire()
      setTimeout(() => {
        navigate('/', {
          replace: true,
        })
      }, 1000)
    }, 2000)
  }
  return (
    <div className="bg-test">
      <div className="mx-6 flex h-screen  items-center justify-center">
        <RiveComponent />
        <Card className="min-w-[30%] max-w-[610px] border-none">
          <CardBody>
            <form
              className="mx-4 flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="mb-3 text-lg font-bold">Sign Up</p>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter your email"
                    size="lg"
                    startContent={
                      <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    color={fieldState.invalid ? 'error' : 'default'}
                    validationState={fieldState.invalid ? 'invalid' : 'valid'}
                    errorMessage={
                      fieldState.invalid ? fieldState.error?.message : ''
                    }
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
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      size="lg"
                      startContent={
                        <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                      }
                      color={fieldState.invalid ? 'error' : 'default'}
                      validationState={fieldState.invalid ? 'invalid' : 'valid'}
                      errorMessage={
                        fieldState.invalid ? fieldState.error?.message : ''
                      }
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
                      labelPlacement="outside"
                      placeholder="Confirm your password"
                      size="lg"
                      startContent={
                        <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                      }
                      color={fieldState.invalid ? 'error' : 'default'}
                      validationState={fieldState.invalid ? 'invalid' : 'valid'}
                      errorMessage={
                        fieldState.invalid ? fieldState.error?.message : ''
                      }
                    />
                  )
                }}
              />
              <Button className="mt-5" color="secondary" type="submit">
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SignUp
