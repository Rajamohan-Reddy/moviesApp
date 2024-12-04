import {Link} from 'react-router-dom'
import './index.css'

const PopularItem = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails

  return (
    <li>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="popular-img" />
      </Link>
    </li>
  )
}

export default PopularItem
