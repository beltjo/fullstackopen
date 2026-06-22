import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Logout = ({ setUser, userWord, homePath }) => {
  const navigate = useNavigate()
  const logoutFunction = () => {
    setUser(null)
    window.localStorage.removeItem({ userWord })
    navigate(homePath)
  }

  return (<Button color='inherit' onClick={logoutFunction}>logout</Button>)
}

export default Logout