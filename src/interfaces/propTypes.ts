import { ReactNode } from 'react'

export interface RouteProps {
  path: string
  element: ReactNode
  exact?: boolean
}

export interface LoginFormData {
  username: string
  password: string
}

export interface AlertPorps {
  type: string
  title: string
  message: string | undefined
  onClose: () => void
}

export interface NavbarProps {
  showProfile?: boolean
}
