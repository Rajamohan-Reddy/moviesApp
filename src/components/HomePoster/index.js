import {Component} from 'react'
import Cookeis from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiAlertFill} from 'react-icons/ri'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePoster extends Component {
  state = {posterObject: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPosterDetails()
  }

  fetchedData = eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    posterPath: eachItem.poster_path,
    backdropPath: eachItem.backdrop_path,
    overview: eachItem.overview,
  })

  getPosterDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookeis.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = data.results.map(eachItem =>
        this.fetchedData(eachItem),
      )
      const updatedDataLength = updatedData.length
      const randomNumber = Math.floor(Math.random() * updatedDataLength)
      const updatedPosterObject = updatedData[randomNumber]
      this.setState({
        posterObject: {...updatedPosterObject},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {posterObject} = this.state
    const {backdropPath, title, overview} = posterObject

    return (
      <div
        className="home-poster-bg-container"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%), url(${backdropPath})`,
        }}
      >
        <Header />

        <div className="homeposter-details">
          <div className="homeposter-details-container">
            <h1 className="title">{title}</h1>
            <p className="overview">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <div className="poster-header-container">
        <Header />
      </div>
      <div className="poster-loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div>
      <div className="poster-header-container">
        <Header />
      </div>
      <div className="poster-loader-container">
        <RiAlertFill className="alert-triangle" color="#d81f26" />
        <p className="failure-view-description">
          Something went wrong. Please try again
        </p>
        <button type="button" className="try-btn">
          Try Again
        </button>
      </div>
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
    return <div>{this.renderResultView()}</div>
  }
}

export default HomePoster
