import { Button, Card, CardBody, Divider, Textarea } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowFilledIcon } from '@/assets/ArrowFilledIcon'
import { openai } from '@/config/openaiClient'
import { useDarkModeContext } from '@/hooks/useDarkMode'
import OpenAI from 'openai'

const Chat = () => {
  const [userInput, setUserInput] = useState('')
  const { isDarkMode } = useDarkModeContext()
  const [message, setMessages] = useState([])
  const [isType, setIsType] = useState(false)
  const handleSummit = async () => {
    try {
      setIsType(true)
      setMessages([
        ...message,
        {
          message: userInput.trim(),
          sender: 'user',
        },
      ])
      setUserInput('')
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are MewAssist of keycap shop, starting with cute word like MeowMeow or something cute.',
          },
          { role: 'user', content: userInput.trim() },
        ],
        model: 'gpt-3.5-turbo',
      })
      setMessages((e) => [
        ...e,
        { message: completion.choices[0].message.content, sender: 'bot' },
      ])
      setIsType(false)
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error.status) // e.g. 401
        console.error(error.message) // e.g. The authentication token you passed was invalid...
        console.error(error.code) // e.g. 'invalid_api_key'
        console.error(error.type) // e.g. 'invalid_request_error'
      } else {
        // Non-API error
        console.log(error)
      }
    }
  }

  return (
    <div className="flex min-h-[89vh] flex-col">
      <Card
        className="mt-3 flex-1 overflow-y-auto p-4 "
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        <CardBody>
          <div className={`mb-4 flex justify-start`}>
            <div className={'max-w-[70%] rounded-lg bg-blue-600 p-3'}>
              <p className={'text-white'}>
                Meow hello, Im MewAssist. Im here to help you with your question
              </p>
            </div>
          </div>
          {message.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex ${
                  item.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`${
                    item.sender === 'user'
                      ? isDarkMode
                        ? 'bg-background'
                        : 'bg-gray-200'
                      : 'bg-blue-600'
                  } max-w-[70%] rounded-lg p-3`}
                >
                  <p
                    className={`${
                      item.sender === 'user' ? 'text-foreground' : 'text-white'
                    }`}
                  >
                    {item.message}
                  </p>
                </div>
              </div>
            )
          })}
          {isType && (
            <p
              className="
             text-base text-blue-300
            "
            >
              Click click clack clack...
            </p>
          )}
        </CardBody>
      </Card>
      <Divider className="my-4" />
      <div className="flex items-center gap-4">
        <Textarea
          minRows={1}
          placeholder="Enter your description"
          className=""
          value={userInput}
          onValueChange={setUserInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              // Add new line when user press shift + enter
              setUserInput(userInput + '\n')
            }
            if (e.key === 'Enter' && !e.shiftKey) {
              // Submit when user press enter
              e.preventDefault()
              handleSummit()
              setUserInput('')
            }
          }}
        />
        <Button
          isIconOnly
          color="secondary"
          aria-label="Like"
          onClick={handleSummit}
        >
          <ArrowFilledIcon />
        </Button>
      </div>
    </div>
  )
}

export default Chat
