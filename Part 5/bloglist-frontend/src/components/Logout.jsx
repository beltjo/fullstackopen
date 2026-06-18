import { useNavigate } from 'react-router-dom'

const Logout = ({ setUser, userWord, homePath }) => {
  const navigate = useNavigate()
  const logoutFunction = () => {
    setUser(null)
    window.localStorage.removeItem({ userWord })
    navigate(homePath)
  }

  return (<button type="button" onClick={logoutFunction}>logout</button>)
}

export default Logout