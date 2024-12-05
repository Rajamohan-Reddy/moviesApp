import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const hiddenPassword = '*'.repeat(password.length)
  const usermail = `${username}@gmail.com`

  const clickToLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <div className="account-header-container">
        <Header />
      </div>
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="hr-line" />
        <div className="member-container">
          <p className="membership-heading">Member ship</p>
          <div className="password-container">
            <p className="user-mail">{usermail}</p>
            <p className="password">Password : {hiddenPassword}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="premium-container">
          <p className="membership-heading">Plan details</p>
          <p className="user-mail">Premium</p>
          <div className="ultra-container">
            <p className="user-mail">Ultra HD</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="btn-container">
          <button type="button" className="logout-btn" onClick={clickToLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="account-header-container">
        <Footer />
      </div>
    </div>
  )
}

export default Account
