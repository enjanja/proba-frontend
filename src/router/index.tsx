import { useRoutes } from 'react-router'
import BoardNurse from '../components/boardNurse'
import Doctor from '../components/doctor'
import Examinations from '../components/examinations'
import Patients from '../components/patients'
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
      children: [
        {
          path: Routes.NURSE,
          element: <BoardNurse />,
          children: [
            { path: Routes.DOCTORS, element: <Doctor /> },
            { path: Routes.PATIENTS, element: <Patients /> },
            { path: Routes.EXAMINATIONS, element: <Examinations /> },
          ],
        },
      ],
    },
    {
      path: Routes.PROFILE,
      element: (
        <ProtectedRoute roles={[Roles.NURSE, Roles.DOCTOR]}>
          <Profile />
        </ProtectedRoute>
      ),
    },
  ]
  const routing = useRoutes(routes)

  return <>{routing}</>
}

export default Router
