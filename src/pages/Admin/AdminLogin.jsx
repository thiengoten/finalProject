import { LockIcon } from '@/assets/LockIcon'
import { MailIcon } from '@/assets/MailIcon'
import { supabase } from '@/config/supabaseClient'
import { loginSchema, registerSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useMatch, useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const isAdmin = useMatch('/admin/login')
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  })
  const onSubmit = async (result) => {
    if (isAdmin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: result.email,
        password: result.password,
      })

      if (data) {
        navigate('/admin/')
      }
    } else {
      console.log(result)
      // const { data, error } = await supabase.auth.signUp({
      //   email: 'feuneneiddahe-9759@yopmail.com',
      //   password: 'Bin@1234',
      //   options: {
      //     data: {
      //       user_role: 'admin',
      //     },
      //     emailRedirectTo: 'http://localhost:5173/admin/',
      //   },
      // })
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="min-w-[30%] max-w-[610px]">
        <CardBody className="overflow-hidden">
          <form
            className="mx-4 flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="mb-3 text-lg font-bold">
              {isAdmin ? 'Admin Login' : 'Admin Register'}
            </p>
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

            <Button className="mt-5" color="primary" type="submit">
              {isAdmin ? 'Login' : 'Register'}
            </Button>
            <Link
              to={isAdmin ? '/admin/register' : '/admin/login'}
              className="text-center text-sm"
            >
              {isAdmin ? 'Create an account' : 'Already have an account?'}
            </Link>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AdminLogin
