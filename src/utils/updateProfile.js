import { supabase } from '@/config/supabaseClient'
import toast from 'react-hot-toast'
import { redirect } from 'react-router-dom'

export async function updateProfileAction({ params, request }) {
  const test = await request.formData()
  let name = test.get('name')
  let avatar = test.get('avatar')
  if (avatar) {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        avatar_url: `https://ahspekfrkxpnpkvmnwcd.supabase.co/storage/v1/object/public/avatar//${avatar}`,
      },
    })
    if (error) {
      console.log(error)
    } else {
      toast.success('Profile updated successfully')
    }
  } else {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
      },
    })
    if (error) {
      console.log(error)
    } else {
      toast.success('Profile updated successfully')
    }
  }
  return redirect('/profile')
}
