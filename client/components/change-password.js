import React from 'react'
import { connect } from 'react-redux'
import { editPassword } from '../store/user'

export const ChangePassword = (props) => {
    return (
        <div>
            <div>
                <form onSubmit={(event) => props.handleSubmit(event)}>
                    <fieldset>
                        <legend>Edit Password</legend>
                        <div>
                            <label>Email</label>
                            <input name="email" type="text" />
                        </div>
                        <div>
                            <label>New Password</label>
                            <input name="newPassword" type="text" />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input name="confirmPassword" type="text" />
                        </div>
                        <button type="submit">Change Password</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

class Loader extends React.Component {
    render() {
        const Render = this.props.Render
        return <Render handleSubmit={this.props.handleSubmit} />
    }
}

const mapState = (state) => {
    return {
        Render: ChangePassword
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            if (event.target.newPassword.value === event.target.confirmPassword.value) {
                let user = {
                    email: event.target.email.value,
                    password: event.target.newPassword.value
                }
                dispatch(editPassword(user))
            }
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)
