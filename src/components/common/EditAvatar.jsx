import { useRef } from 'react'

const EditAvatar = ({ avatar, onAvatarChange }) => {
  const fileInputRef = useRef()

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      onAvatarChange(file)
    }
  }

  return (
    <div>
      <img src={avatar} alt="avatar" onClick={handleAvatarClick} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default EditAvatar
