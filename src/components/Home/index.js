import HomePoster from '../HomePoster'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Footer from '../Footer'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <HomePoster />
    <TrendingNow />
    <Originals />
    <Footer />
  </div>
)

export default Home
