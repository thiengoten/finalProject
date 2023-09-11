import { Button, Card, CardBody, Divider, Textarea } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowFilledIcon } from '@/assets/ArrowFilledIcon'
import { openai } from '@/config/openaiClient'
import { useDarkModeContext } from '@/hooks/useDarkMode'

const Chat = () => {
  const [userInput, setUserInput] = useState('')
  const { isDarkMode } = useDarkModeContext()
  const [message, setMessages] = useState([])
  const [isType, setIsType] = useState(false)
  const handleSummit = async () => {
    setIsType(true)
    setMessages([
      ...message,
      {
        message: userInput,
        sender: 'user',
      },
    ])
    setUserInput('')
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userInput }],
      model: 'gpt-3.5-turbo',
    })
    setMessages((e) => [
      ...e,
      { message: completion.choices[0].message.content, sender: 'bot' },
    ])
    setIsType(false)
  }

  return (
    <div className="flex min-h-[89vh] flex-col">
      <Card
        className="mt-3 flex-1 overflow-y-auto p-4 "
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        <CardBody>
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
              MewAssist is thingking...
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
              setUserInput(userInput + '\n')
            }
            if (e.key === 'Enter' && !e.shiftKey) {
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
