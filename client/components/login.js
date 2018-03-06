import React from 'react'
import { connect } from 'react-redux'
import { login } from '../store'


const Login = (props) => {
  const { loggedInUser, order } = props;
  return (
    <div>
      {loggedInUser ? <h5>You are already logged in as {loggedInUser.name}</h5> :
        <div>
          <div>
            <form onSubmit={(event) => props.loginSubmit(event, order.order)}>
              <div>
                <label>Email :</label>
                <input name="email" type="email" />
              </div>
              <div>
                <label>Password :</label>
                <input name="password" type="password" />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
          <div>
            <h5>OR</h5>
          </div>
          <div>
            <p>
              <a target="_self" href="/auth/google"> Login with Google </a>
            </p>
          </div>
        </div>
      }
    </div>
  )
}


const mapState = ({ loggedInUser, order }) => ({ loggedInUser, order })


const mapDispatch = (dispatch) => ({
  loginSubmit(event, order) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    dispatch(login(email, password, order))
  }
})


export default connect(mapState, mapDispatch)(Login)
