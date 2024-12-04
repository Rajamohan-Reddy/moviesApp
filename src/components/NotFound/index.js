import './index.css'

const NotFound = props => {
  const goHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-bg-container">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-description">
        We are sorry the you requested could not be found
      </p>
      <p className="not-found-description">Please go back to the homepage.</p>
      <button type="button" className="go-home-btn" onClick={goHome}>
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
