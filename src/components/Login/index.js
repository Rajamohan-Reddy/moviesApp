import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSucess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitFormData = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSucess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password, showErrorMsg, errorMsg} = this.state

    return (
      <div className="input-container">
        <label className="label-input" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          className="text-input"
          onChange={this.changePassword}
        />
        {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
    )
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label className="label-input" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          className="text-input"
          onChange={this.changeUsername}
        />
      </div>
    )
  }

  renderForm = () => (
    <div className="form-container">
      <form onSubmit={this.submitFormData}>
        <h1 className="login-heading">Login</h1>
        {this.renderUsername()}
        {this.renderPassword()}
        <button type="submit" className="sigin-btn">
          Sign in
        </button>
        <button type="submit" className="login-btn">
          Log in
        </button>
      </form>
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-bg-container">
        <img
          src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732333945/atkhwjk2xo3odvogc9uz.png"
          alt="website logo"
          className="website-logo"
        />
        <div className="login-form-container">{this.renderForm()}</div>
      </div>
    )
  }
}

export default Login
