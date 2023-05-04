import { useRoutes } from 'react-router'
import Doctor from '../components/doctor'
import Examinations from '../components/examinations/examinations'
import Patients from '../components/patients'
import { Roles } from '../enums/roles'
import { Routes } from '../enums/routes'
import { RouteProps } from '../interfaces/propTypes'
import Home from '../pages/home'
import Login from '../pages/login/login'
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
          element: <Home />,
          children: [
            { path: Routes.DOCTORS, element: <Doctor /> },
            { path: Routes.PATIENTS, element: <Patients /> },
            { path: Routes.EXAMINATIONS, element: <Examinations /> },
            { path: Routes.PROFILE, element: <Profile /> },
          ],
        },
        {
          path: Routes.DOCTOR,
          element: <Home />,
          children: [
            { path: Routes.EXAMINATIONS, element: <Examinations /> },
            { path: Routes.PROFILE, element: <Profile /> },
          ],
        },
      ],
    },
  ]
  const routing = useRoutes(routes)

  return <>{routing}</>
}

export default Router
