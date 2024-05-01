import { supabase } from '@/config/supabaseClient'
import { Button, Input } from '@nextui-org/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Form, useLoaderData } from 'react-router-dom'

const Profile = () => {
  const userData = useLoaderData()
  const [avatar, setAavatar] = useState(
    userData?.user_metadata?.avatar_url
      ? `${userData?.user_metadata?.avatar_url}`
      : `https://api.dicebear.com/7.x/micah/svg?seed=${userData?.email}`,
  )

  const [name, setName] = useState(userData?.user_metadata?.full_name)

  const [email, setEmail] = useState(userData?.email)
  const fileInputRef = useRef()

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  // const handleUpdate = async () => {
  //   const { data, error } = await supabase.auth.updateUser({
  //     data: {
  //       full_name: name,
  //       avatar_url: avatar?.name
  //         ? `https://ahspekfrkxpnpkvmnwcd.supabase.co/storage/v1/object/public/avatar//${avatar.name}`
  //         : null,
  //     },
  //   })
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     toast.success('Profile updated successfully')
  //   }
  // }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const { data, error } = await supabase.storage
        .from('avatar')
        .upload(file.name, file)
      if (error) {
        console.log(error)
      } else {
        console.log(data)
      }
      setAavatar(file)
    }
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-4 mt-8 text-3xl font-bold">Profile</h1>
      <Form
        className="
        flex w-full flex-col items-center gap-4
      "
        action="/update-profile"
        method="post"
        onSubmit={(e) => {
          if (!confirm('Are you sure you want to update your profile?')) {
            e.preventDefault()
          }
        }}
      >
        <img
          src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
          alt="avatar"
          onClick={handleAvatarClick}
          className=" h-20 w-20 cursor-pointer rounded-full border-2 border-primary-500 object-cover"
        />
        <input
          type="file"
          ref={fileInputRef}
          name="avatar"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Input
          isDisabled
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-xs"
        />
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-xs"
        />
        <Button color="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}

export default Profile
