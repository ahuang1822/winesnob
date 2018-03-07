import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div>
      <h1>Wine Snobs</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div id="topnav">
          <Link to="/">Home</Link>
          <Link to="/account-page">Account Page</Link>
          <Link to="/winelist">Wine Collection</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div id="topnav">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/winelist">Wine Collection</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
    </nav>
  </div>
)


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
    handleClick(event) {
      event.preventDefault()
      dispatch(logout())
    }
  }
}


export default connect(mapState, mapDispatch)(Navbar)


Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
