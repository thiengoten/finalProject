import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Link,
} from '@nextui-org/react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EyeSlashFilledIcon } from '@/assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@/assets/EyeFilledIcon'
import { MailIcon } from '@/assets/MailIcon'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/config/supabaseClient'
import GoogleSignInButton from './GoogleSignInButton'

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim,
      'Please enter a valid email address',
    )
    .required(),
  password: yup
    .string()
    .min(8)
    .max(12)
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,12}$/gim,
      'password contain 8 to 12 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    )
    .required(),
})

const LoginModal = ({ isOpen, onOpenChange }) => {
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = async (resource) => {
    const { email, password } = resource
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data) {
      onOpenChange(false)
      navigate('/')
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: 'easeInOut',
              },
            },
            exit: {
              y: 50,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeInOut',
              },
            },
          },
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        color={fieldState.invalid ? 'error' : 'default'}
                        validationState={
                          field.value && fieldState.invalid
                            ? 'invalid'
                            : 'valid'
                        }
                        errorMessage={
                          field.value && errors.email
                            ? errors.email.message
                            : ''
                        }
                        endContent={
                          <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                        }
                      />
                    )
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      label="Password"
                      placeholder="Enter your password"
                      variant="bordered"
                      color={fieldState.invalid ? 'error' : 'default'}
                      validationState={
                        field.value && fieldState.invalid ? 'invalid' : 'valid'
                      }
                      errorMessage={
                        field.value && errors.password
                          ? errors.password.message
                          : ''
                      }
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                      type={isVisible ? 'text' : 'password'}
                    />
                  )}
                />
                <div className="flex justify-between px-1 py-2">
                  <Link
                    className="hover:cursor-pointer"
                    color="primary"
                    size="sm"
                    onClick={() => navigate('/sign-up')}
                    anchorIcon
                  >
                    Dont have an account?
                  </Link>
                  <GoogleSignInButton onOpenChange={onOpenChange} />
                </div>

                <Button
                  color="secondary"
                  variant="flat"
                  type="submit"
                  className="w-full"
                  isDisabled={!isDirty || !isValid}
                >
                  Log in
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
