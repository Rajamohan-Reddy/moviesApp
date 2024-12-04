import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdCancel} from 'react-icons/md'
import Popup from 'reactjs-popup'

import './index.css'

class Header extends Component {
  state = {showSearchBar: false, searchInput: ''}

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickEnter = event => {
    const {searchInput} = this.state
    const {setSearchInput} = this.props
    if (event.key === 'Enter') {
      setSearchInput(searchInput)
    }
  }

  clickSearchBtn = () => {
    this.setState(prevState => ({showSearchBar: !prevState.showSearchBar}))
  }

  renderSmallContainer = () => {
    const {showSearchBar} = this.state

    return (
      <nav className="nav-sm-container">
        <div className="navbar-container">
          <img
            src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732333945/atkhwjk2xo3odvogc9uz.png"
            alt="website logo"
            className="header-logo"
          />
          <div className="search-hamberger-container">
            {showSearchBar ? (
              <div className="search-input-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  onKeyDown={this.clickEnter}
                />
                <div className="search-icon-container">
                  <Link to="/search">
                    <HiOutlineSearch
                      className="input-search-icon"
                      onClick={this.clickSearchBtn}
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <HiOutlineSearch
                className="search-icon"
                onClick={this.clickSearchBtn}
              />
            )}
          </div>
          <div>
            <Popup
              arrow={false}
              trigger={
                <button type="button" className="popup-btn">
                  <img
                    src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732860590/tloszozzh8ptnxjqsyi8.svg"
                    alt="hamberger icon"
                    className="popup-img"
                  />
                </button>
              }
              position="bottom right"
            >
              {close => (
                <div className="popup-outer-container">
                  <div className="popup-inner-container">
                    <ul className="header-list-container">
                      <li>
                        <Link to="/" className="header-link-item">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/popular" className="header-link-item">
                          Popular
                        </Link>
                      </li>
                      <li>
                        <Link to="/account" className="header-link-item">
                          Account
                        </Link>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => close()}
                      className="close-btn"
                    >
                      <MdCancel size={24} className="close-icon" />
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </nav>
    )
  }

  renderLargeContainer = () => {
    const {showSearchBar} = this.state
    return (
      <nav className="nav-lg-container">
        <div className="navbar-container">
          <img
            src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732333945/atkhwjk2xo3odvogc9uz.png"
            alt="website logo"
            className="header-logo"
          />
          <ul className="header-list-container">
            <li>
              <Link to="/" className="header-link-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="header-link-item">
                Popular
              </Link>
            </li>
          </ul>
          <div className="search-hamberger-container">
            {showSearchBar ? (
              <div className="search-input-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  onKeyDown={this.clickEnter}
                />
                <div className="search-icon-container">
                  <HiOutlineSearch
                    className="input-search-icon"
                    onClick={this.clickSearchBtn}
                  />
                </div>
              </div>
            ) : (
              <Link to="/search">
                <HiOutlineSearch
                  className="search-icon"
                  onClick={this.clickSearchBtn}
                />
              </Link>
            )}
          </div>
          <div className="profile-container">
            <Link to="/account" className="profile-link">
              <img
                src="https://res.cloudinary.com/dchkvmpzf/image/upload/v1732531135/dt4hqonrnqkpcugijkvb.png"
                alt="profile"
              />
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  render() {
    return (
      <>
        {this.renderSmallContainer()}
        {this.renderLargeContainer()}
      </>
    )
  }
}

export default Header
