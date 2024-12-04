import {Link} from 'react-router-dom'
import './index.css'

const TrendingItem = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  console.log(posterPath)

  return (
    <div className="slider-item">
      <Link to={`movies/${id}`} className="slider-link-item">
        <img src={posterPath} alt={title} className="slider-img" />
      </Link>
    </div>
  )
}

export default TrendingItem
