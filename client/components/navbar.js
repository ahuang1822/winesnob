import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
//import { fetchItems } from '../store/cart'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Wine Snobs</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home" className="button">Home</Link>
          <Link to="/account-page" className="button">Account Page</Link>
          <Link to="/winelist" className="button">Wine Collection</Link>
          <Link to="/cart" className="button">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/" className="button">Home</Link>
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Sign Up</Link>
          <Link to="/winelist" className="button">Wine Collection</Link>
          <Link to="/cart" className="button">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  let bool = false;
  if (state.user.loggedInUser.id) {
    bool = true;
  }
  return {
    isLoggedIn: bool
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
     }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
