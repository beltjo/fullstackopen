const Login = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input type="text" value={username} onChange={ ( { target } ) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input type="text" value={password} onChange={ ( { target }) => setPassword(target.value)}/>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

export default Login