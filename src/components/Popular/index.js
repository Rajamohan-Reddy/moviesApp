import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PopularItem from '../PopularItem'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  fetchedData = eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    posterPath: eachItem.poster_path,
    backdropPath: eachItem.backdrop_path,
    overview: eachItem.overview,
  })

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const popularMovies = data.results.map(eachItem =>
        this.fetchedData(eachItem),
      )

      this.setState({
        popularMoviesList: popularMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMoviesList} = this.state

    return (
      <div className="popular-sub-container">
        <ul className="popular-list-container">
          {popularMoviesList.map(eachItem => (
            <PopularItem key={eachItem.id} movieDetails={eachItem} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  clickTryAgainBtn = () => this.getPopularMovies()

  renderFailureView = () => (
    <div className="popular-loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732684350/nvmwx68jriusbovgjfo9.png"
        alt="failure view"
        className="popular-failure-img"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-btn" onClick={this.clickTryAgainBtn}>
        Try Again
      </button>
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg-container">
        <div className="popular-header-container">
          <Header />
        </div>
        {this.renderResultView()}
      </div>
    )
  }
}

export default Popular
