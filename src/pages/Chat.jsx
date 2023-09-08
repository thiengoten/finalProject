import { Button, Card, CardBody, Divider, Textarea } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import { MessageIcon } from '@/assets/MessageIcon'
import { ArrowFilledIcon } from '@/assets/ArrowFilledIcon'

const Chat = () => {
  // const [inputValue, setInputValue] = useState('')
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value)
  // }
  return (
    <div className="flex min-h-[89vh] flex-col">
      <Card
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        <CardBody>
          <Textarea
            isReadOnly
            label="MewAssist"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h max-w-xs"
          />
          <Textarea
            isDisabled
            label="user"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h ml-auto max-w-xs"
          />
          <Textarea
            isReadOnly
            label="MewAssist"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h max-w-xs"
          />
          <Textarea
            isReadOnly
            label="MewAssist"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h max-w-xs"
          />
          <Textarea
            isReadOnly
            label="MewAssist"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h max-w-xs"
          />
          <Textarea
            isReadOnly
            label="MewAssist"
            labelPlacement="outside"
            placeholder="Enter your description"
            defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
            className="min-h max-w-xs"
          />
        </CardBody>
      </Card>
      <Divider className="my-4" />
      <div className="flex items-center gap-4">
        <Textarea
          minRows={1}
          placeholder="Enter your description"
          className=""
        />
        <Button isIconOnly color="secondary" aria-label="Like">
          <ArrowFilledIcon />
        </Button>
      </div>
    </div>
  )
}

export default Chat
