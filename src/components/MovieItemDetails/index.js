import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PopularItem from '../PopularItem'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieObject: {},
    genresList: [],
    languagesList: [],
    similarMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieObject()
  }

  fetchedLanguages = eachItem => ({
    id: eachItem.id,
    englishName: eachItem.english_name,
  })

  fetchedGenres = eachItem => ({
    id: eachItem.id,
    name: eachItem.name,
  })

  fetchedData = eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    posterPath: eachItem.poster_path,
    backdropPath: eachItem.backdrop_path,
    overview: eachItem.overview,
  })

  getMovieObject = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const movieData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }

      const renderLanguages = data.movie_details.spoken_languages.map(
        eachItem => this.fetchedLanguages(eachItem),
      )
      const renderGenres = data.movie_details.genres.map(eachItem =>
        this.fetchedGenres(eachItem),
      )

      const renderSimilarMovies = data.movie_details.similar_movies.map(
        eachItem => this.fetchedData(eachItem),
      )

      const slicedMovies = renderSimilarMovies.slice(0, 6)

      this.setState({
        movieObject: {...movieData},
        languagesList: renderLanguages,
        genresList: renderGenres,
        similarMoviesList: slicedMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movieObject, genresList, languagesList, similarMoviesList} =
      this.state
    const {
      backdropPath,
      title,
      overview,
      runtime,
      releaseDate,
      adult,
      budget,
      voteCount,
      voteAverage,
    } = movieObject
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const duration = `${hours}h ${minutes}m`
    const censorType = adult ? 'A' : 'U/A'
    const formattedDate = new Date(releaseDate)
    const year = formattedDate.getFullYear()
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const date = formattedDate.getDate().toString()
    const month = formattedDate.getMonth()
    const nameOfMonth = monthNames[month]
    let dateEnd
    if (date.endsWith('1')) {
      dateEnd = 'st'
    } else if (date.endsWith('2')) {
      dateEnd = 'nd'
    } else if (date.endsWith('3')) {
      dateEnd = 'rd'
    } else {
      dateEnd = 'th'
    }

    const stringifiedDate = `${date}${dateEnd} ${nameOfMonth} ${year}`

    return (
      <>
        <div
          className="movie-details-bg-container"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #131313 92.82%, #131313 98.68%, #131313 108.61%), url(${backdropPath})`,
          }}
        >
          <Header />
          <div className="homeposter-details">
            <div className="homeposter-details-container">
              <h1 className="title">{title}</h1>
              <div className="duration-censor-container">
                <p className="duration">{duration}</p>
                <div className="censor-container">
                  <p className="duration">{censorType}</p>
                </div>
                <p className="duration">{year}</p>
              </div>
              <p className="overview">{overview}</p>
              <button type="button" className="play-btn">
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="details-main-conatiner">
          <div>
            <h1 className="details-heading">Genres</h1>
            <div>
              {genresList.map(eachItem => (
                <p key={eachItem.id} className="details-paragraph">
                  {eachItem.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h1 className="details-heading">Audio Available</h1>
            <div>
              {languagesList.map(eachItem => (
                <p key={eachItem.id} className="details-paragraph">
                  {eachItem.englishName}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h1 className="details-heading">Rating Count</h1>
            <p className="details-paragraph">{voteCount}</p>
            <h1 className="details-heading">Rating Average</h1>
            <p className="details-paragraph">{voteAverage}</p>
          </div>
          <div>
            <h1 className="details-heading">Budget</h1>
            <p className="details-paragraph">{budget}</p>
            <h1 className="details-heading">Release Date</h1>
            <p className="details-paragraph">{stringifiedDate}</p>
          </div>
        </div>
        <div className="more-like-this-container">
          <h1 className="more-like-this-heading">More like this</h1>
          <div>
            <ul className="similar-movies-list-container">
              {similarMoviesList.map(eachItem => (
                <PopularItem key={eachItem.id} movieDetails={eachItem} />
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div>
      <Header />
      <div className="popular-loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  clickTryAgainBtn = () => this.getMovieObject()

  renderFailureView = () => (
    <div>
      <Header />
      <div className="popular-loader-container" data-testid="loader">
        <img
          src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732684350/nvmwx68jriusbovgjfo9.png"
          alt="failure view"
          className="popular-failure-img"
        />
        <p className="failure-view-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="try-btn"
          onClick={this.clickTryAgainBtn}
        >
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
    return (
      <div className="movie-item-details-container">
        {this.renderResultView()}
      </div>
    )
  }
}

export default MovieItemDetails
