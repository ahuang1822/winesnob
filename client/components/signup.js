import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../store'


export const Signup = (props) => {
    return (
        <div>
            <form onSubmit={props.signupSubmit}>
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
        <label>Phone:</label>
        <input
          name="phone"
          type="phone"
        />
      </div>
              <button type="submit">Sign up</button>
            </form>
          </div>
      );
}


const mapState = () => ({message: 'Sign up'})

const mapDispatch = (dispatch) => ({
    signupSubmit(event){
     event.preventDefault()
     dispatch(signup({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
        address: event.target.address.value,
        city: event.target.city.value,
        state: event.target.state.value,
        phone: event.target.phone.value
     }))
    }
})

export default connect(mapState, mapDispatch)(Signup)
