import { MailIcon } from '@/assets/MailIcon'
import { MessageIcon } from '@/assets/MessageIcon'
import { EmailForm, PhoneForm } from '@/components/forms'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
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

  return (
    <div className="bg-test">
      <div className="mx-6 flex h-screen items-center justify-center">
        <RiveComponent />
        <Card className="min-w-[30%] max-w-[610px]">
          <CardBody className="overflow-hidden">
            <Tabs fullWidth size="md" aria-label="Tabs form">
              <Tab
                key="signup-email"
                title={
                  <div className="flex items-center gap-2">
                    <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    <span>Email</span>
                  </div>
                }
              >
                <EmailForm isHandsUpInput={isHandsUpInput} />
              </Tab>
              <Tab
                key="signup-phone"
                title={
                  <div className="flex items-center gap-2">
                    <MessageIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    <span>Phone</span>
                  </div>
                }
              >
                <PhoneForm isHandsUpInput={isHandsUpInput} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
        Car
      </div>
    </div>
  )
}

export default SignUp
