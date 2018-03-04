import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../store'


export const Signup = (props) => {
  const { order } = props;
  return (
    <div>
      <form onSubmit={(event) => props.signupSubmit(event, order.order)}>
        <div>
          <label>First Name:</label>
          <input
            name="firstName"
            type="firstName"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            name="lastName"
            type="lastName"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            name="address"
            type="address"
          />
        </div>
        <div>
          <label>City:</label>
          <input
            name="city"
            type="city"
          />
        </div>
        <div>
          <label>State:</label>
          <input
            name="state"
            type="state"
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            name="country"
            type="country"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            name="phone"
            type="phone"
          />
        </div>
        <button type="submit">Sign up</button>
      </form>

      <div>
         <h5>OR</h5>
      </div>
      <div>
         <p>
           <a target="_self" href="/auth/google"> Sign up with Google </a>
         </p>
      </div>
    </div>
  );
}


const mapState = ({ loggedInUser, order }) => ({ loggedInUser, order })

const mapDispatch = (dispatch) => ({
  signupSubmit(event, order){
   event.preventDefault()
   const userInfo = {
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    email: event.target.email.value,
    password: event.target.password.value,
    address: event.target.address.value,
    city: event.target.city.value,
    state: event.target.state.value,
    country: event.target.country.value,
    phone: event.target.phone.value,
  }
    dispatch(signup(userInfo, order))
  }
})

export default connect(mapState, mapDispatch)(Signup)
