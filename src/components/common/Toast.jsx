import { Icon } from '@iconify/react'

const Toast = ({ message, type, onClose }) => {
  const toastColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <div
      className={`fixed bottom-0 right-0 m-6 rounded-md p-5 text-white ${toastColor}`}
    >
      {message}
      <button
        className="absolute right-0 top-0 ml-3 mr-2 mt-1 text-white"
        onClick={onClose}
      >
        <Icon icon="icon-park-outline:close-small" />
      </button>
    </div>
  )
}

export default Toast
