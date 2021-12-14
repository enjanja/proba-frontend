import BoardNurse from '../../components/boardNurse'
import Navbar from '../../components/navbar'

const Home = () => {
  const type = JSON.parse(localStorage.getItem('type') || '')

  return (
    <>
      <Navbar showProfile />
      {type === 2 ? <BoardNurse /> : null}
    </>
  )
}

export default Home
