import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../store'


const Login = (props) => {
    const { loggedInUser } = props;
    return (
        <div>
        { loggedInUser.id ? <h5>You are already logged in as {loggedInUser.name}</h5> :
       <div>
        <div>
        <form onSubmit={props.loginSubmit}>
       <div>
       <label>Email :</label>
       <input name="email" type="email"/>
       </div>
       <div>
       <label>Password :</label>
       <input name="password" type="password"/>
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




const mapState = (state) => ({ loggedInUser: state.user.loggedInUser })

const mapDispatch = (dispatch) => ({
    loginSubmit(event) {
        event.preventDefault()
        dispatch(login({ email: event.target.email.value, password: event.target.password.value }))
    }
}
)

export default connect(mapState, mapDispatch)(Login)