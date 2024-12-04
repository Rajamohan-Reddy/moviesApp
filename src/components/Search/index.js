import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PopularItem from '../PopularItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: null,
    searchedMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchedMovies()
  }

  setSearchInput = searchValue => {
    this.setState({searchInput: searchValue}, this.getSearchedMovies)
  }

  fetchedData = eachItem => ({
    id: eachItem.id,
    title: eachItem.title,
    posterPath: eachItem.poster_path,
    backdropPath: eachItem.backdrop_path,
    overview: eachItem.overview,
  })

  getSearchedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const seachedMovies = data.results.map(eachItem =>
        this.fetchedData(eachItem),
      )
      this.setState({
        searchedMoviesList: seachedMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {searchedMoviesList, searchInput} = this.state
    const searchedListLength = searchedMoviesList.length
    const showNoView = searchedListLength <= 0 && searchInput !== null

    return (
      <div className="searched-movies-container">
        {showNoView ? (
          this.renderNoMoviesView()
        ) : (
          <ul className="searched-movies-list-container">
            {searchedMoviesList.map(eachItem => (
              <PopularItem key={eachItem.id} movieDetails={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderNoMoviesView = () => {
    const {searchInput} = this.state
    const noViewDescription = `Your search for ${searchInput} did not find any matches.`
    return (
      <div>
        <div className="popular-loader-container" data-testid="loader">
          <img
            src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732960180/flejgme1j9afcjvxxvki.png"
            alt="failure view"
            className="popular-failure-img"
          />
          <p className="failure-view-description">{noViewDescription}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  clickTryAgainBtn = () => this.getSearchedMovies()

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
      <div className="search-bg-container">
        <Header setSearchInput={this.setSearchInput} />
        <div>{this.renderResultView()}</div>
      </div>
    )
  }
}

export default Search
