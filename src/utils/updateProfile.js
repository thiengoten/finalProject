import { supabase } from '@/config/supabaseClient'
import toast from 'react-hot-toast'
import { redirect } from 'react-router-dom'

export async function updateProfileAction({ params, request }) {
  const test = await request.formData()
  const name = test.get('name')
  const avatar = test.get('avatar')

  const userData = { data: { full_name: name } }

  if (avatar) {
    userData.data.avatar_url = `https://ahspekfrkxpnpkvmnwcd.supabase.co/storage/v1/object/public/avatar//${avatar}`
  }

  const { data, error } = await supabase.auth.updateUser(userData)

  if (error) {
    console.log(error)
  } else {
    toast.success('Profile updated successfully')
  }

  return redirect('/profile')
}
