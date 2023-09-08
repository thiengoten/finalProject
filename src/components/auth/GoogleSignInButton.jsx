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

    if (error) return console.log(error)
    onOpenChange(false)
    navigate('/')
  }
  useEffect(() => {
    if (divRef.current) {
      window.google?.accounts.id.initialize({
        client_id:
          '272725794739-f3n7v1m89inr4ell8q9i2sqntlj1u8vu.apps.googleusercontent.com',
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
