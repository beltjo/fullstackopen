const Login = ({username, setUsername, password, setPassword, handleLogin, loginMessage}) => (
  <div>
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input type="text" value={username} onChange={ ( {target} ) => setUsername(target.value)} />
        </label>  
      </div>
      <div>
        <label>
          password
          <input type="text" value={password} onChange={ ( { target }) => setPassword(target.value)}/>
        </label>
      </div>
      <button type="submit">Login</button>
      { loginMessage && (
        <div>
          <p>
            {loginMessage}
          </p>
        </div>
      )}
    </form>
  </div>
)

export default Login