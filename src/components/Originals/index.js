import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {RiAlertFill} from 'react-icons/ri'

import OriginalItem from '../OriginalItem'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {originalMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginalMovies()
  }

  fetchedData = eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    posterPath: eachItem.poster_path,
    backdropPath: eachItem.backdrop_path,
    overview: eachItem.overview,
  })

  getOriginalMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const originalMovies = data.results.map(eachItem =>
        this.fetchedData(eachItem),
      )

      this.setState({
        originalMoviesList: originalMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {originalMoviesList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <Slider {...settings}>
          {originalMoviesList.map(eachItem => (
            <OriginalItem key={eachItem.id} movieDetails={eachItem} />
          ))}
        </Slider>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  clickTryAgainBtn = () => this.getOriginalMovies()

  renderFailureView = () => (
    <div className="loader-container">
      <RiAlertFill className="alert-triangle" color="#d81f26" />
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
      <div className="trending-bg-container">
        <div className="trending-slider-container">
          <h1 className="slider-heading">Originals</h1>
          {this.renderResultView()}
        </div>
      </div>
    )
  }
}

export default Originals
