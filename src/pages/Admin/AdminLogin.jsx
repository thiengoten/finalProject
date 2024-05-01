import { LockIcon } from '@/assets/LockIcon'
import { MailIcon } from '@/assets/MailIcon'
import { supabase } from '@/config/supabaseClient'
import { loginSchema } from '@/utils/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useMatch } from 'react-router-dom'

const AdminLogin = () => {
  const isLogin = useMatch('/admin/login')
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  })
  const onSubmit = async (result) => {
    // //TODO: Test login
    const { data, error } = await supabase.auth.signUp({
      email: 'recreppulegrei-3838@yopmail.com',
      password: 'Bin@1234',
      options: {
        data: {
          user_role: 'admin',
        },
        emailRedirectTo: 'http://localhost:5173/admin/',
      },
    })
    console.log('🚀 ~ onSubmit ~ error:', error)
    console.log('🚀 ~ onSubmit ~ data:', data)
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
              {isLogin ? 'Login' : 'Register'}
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
            {!isLogin && (
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
            )}

            <Button className="mt-5" color="primary" type="submit">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AdminLogin
