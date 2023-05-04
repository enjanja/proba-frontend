import Router from './router/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  )
}

export default App
