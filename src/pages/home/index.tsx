import BoardNurse from '../../components/boardNurse'
import Navbar from '../../components/navbar'

const Home = () => {
  const type = JSON.parse(localStorage.getItem('type') || '')

  return (
    <>
      <Navbar />
      {type === 1 ? <BoardNurse /> : null}
    </>
  )
}

export default Home
