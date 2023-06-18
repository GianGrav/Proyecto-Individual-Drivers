import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'

import { getDrivers, getTeams } from './redux/driverSlice';
import LandingPage from './components/LandingPage/landingPage';
import HomePage from './components/HomePege/homePage';
// import DetailPage from './components/detaiPage'
// import NavBar from './components/navBar'
// import DriverForm from './components/driverForm'

function App() {

  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const URL = 'http://localhost:3001/drivers'

  const URLT = 'http://localhost:3001/drivers/teams'

  useEffect(() => {
    const getAllDrivers = async () => {
      try {
        const { data } = await axios(URL)
        dispatch(getDrivers(data))

        const res = await axios(URLT)
        dispatch(getTeams(res.data))

      } catch (error) {
        throw error.message
      }
    }
    getAllDrivers();

  }, [])


  return (
    <div>

      {/* {pathname !== '/' ? <NavBar /> : ''} */}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        {/* <Route path='/details/:id' element={<DetailPage />} />
        <Route path='/newdriver' element={<DriverForm />} /> */}
      </Routes>

    </div>
  )
}

export default App
