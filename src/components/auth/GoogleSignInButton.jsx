import { supabase } from '@/config/supabaseClient'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const GoogleSignInButton = ({ onOpenChange }) => {
  const divRef = useRef(null)
  const navigate = useNavigate()

  const handleSignInWithGoogle = async (response) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })

    if (error) {
      console.log(error)
    }
    onOpenChange(false)
    navigate('/')
  }
  useEffect(() => {
    if (divRef.current) {
      window.google?.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleSignInWithGoogle,
        context: 'signin',
        ux_mode: 'popup',
      })
      window.google?.accounts.id.renderButton(divRef.current, {
        theme: 'filled_blue',
        size: 'medium',
        type: 'standard',
        text: 'signin_with_google',
      })
    }
  }, [divRef.current])
  return (
    <>
      <div ref={divRef} />
    </>
  )
}

export default GoogleSignInButton
