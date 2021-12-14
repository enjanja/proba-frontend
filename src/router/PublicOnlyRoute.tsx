import { Navigate } from 'react-router'
import { Routes } from '../enums/routes'

type PublicOnlyRoutePorps = {
  children: JSX.Element
}

const PublicOnlyRoute = ({ children }: PublicOnlyRoutePorps) => {
  const jwt = localStorage.getItem('jwt')
  // console.log(jwt)

  const isLoggedIn = jwt
  return isLoggedIn ? <Navigate to={Routes.HOME} /> : children
}

export default PublicOnlyRoute
