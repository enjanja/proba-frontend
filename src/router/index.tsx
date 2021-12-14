import { useRoutes } from 'react-router'
import BoardNurse from '../components/boardNurse'
import { Roles } from '../enums/roles'
import { Routes } from '../enums/routes'
import { RouteProps } from '../interfaces/propTypes'
import Home from '../pages/home'
import Login from '../pages/login'
import Profile from '../pages/profile'
import ProtectedRoute from './ProtectedRoute'
import PublicOnlyRoute from './PublicOnlyRoute'

const Router = () => {
  const routes: RouteProps[] = [
    {
      path: Routes.LOGIN,
      element: (
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      ),
    },
    {
      exact: true,
      path: Routes.HOME,
      element: (
        <ProtectedRoute roles={[Roles.NURSE, Roles.DOCTOR]}>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: Routes.PROFILE,
      element: (
        <ProtectedRoute roles={[Roles.NURSE, Roles.DOCTOR]}>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: Routes.NURSE,
      element: (
        <ProtectedRoute roles={[Roles.NURSE]}>
          <BoardNurse />
        </ProtectedRoute>
      ),
    },
  ]
  const routing = useRoutes(routes)

  return <>{routing}</>
}

export default Router
