import { Navigate } from 'react-router'
import { Routes } from '../enums/routes'
type ProtectedRouteProps = {
  children: JSX.Element
  roles: number[]
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const jwt = localStorage.getItem('jwt')
  const type = localStorage.getItem('type') || ''

  const isLoggedIn = jwt
  const userHasType = roles.includes(parseInt(type))
  console.log('protected')

  if (!isLoggedIn) {
    return <Navigate to={Routes.LOGIN} />
  }

  if (isLoggedIn && !userHasType) {
    return <Navigate to={Routes.HOME} />
  }
  return children
}

export default ProtectedRoute
