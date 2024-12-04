import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Popular from './components/Popular'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Account} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
