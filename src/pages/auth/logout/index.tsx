import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RoutePath } from '~/constants/portal-routes'
import TemplateOnline from '~/template/online'

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(RoutePath.auth.login)
  }, [])

  return <TemplateOnline>LogoutPage</TemplateOnline>
}

export default LogoutPage
