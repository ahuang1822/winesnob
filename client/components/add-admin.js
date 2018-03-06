import React from 'react'
import { connect } from 'react-redux'
import { addAdmin } from '../store/user'

export const AddAdmin = (props) => {
    console.log('test AddWine')
    const user = props.user
    return (
        <div>
            {
                user.isAdmin
                    ? (
                        <div>
                            <h3>{name}</h3>
                            <form onSubmit={(event) => props.handleSubmit(event)}>
                                <fieldset>
                                    <legend>Add Admin</legend>
                                    <div>
                                        <label>Email</label>
                                        <input name="email" type="text" />
                                    </div>
                                    <div>
                                        <label>First Name</label>
                                        <input name="firstName" type="text" />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input name="lastName" type="text" />
                                    </div>
                                    <button type="submit">Add Admin</button>
                                </fieldset>
                            </form>
                        </div>
                    )
                    : <h3>404 Error</h3>
            }

        </div>
    )
}

class Loader extends React.Component {
    render() {
        const Render = this.props.Render
        return <Render handleSubmit={this.props.handleSubmit} user={this.props.user} />
    }
}

const mapState = (state) => {


    return {
        user: state.user.loggedInUser,
        Render: AddAdmin
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            let user = {
                email: event.target.email.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value
            }
            // dispatch(addWine(newWine))
            console.log(user)
            dispatch(addAdmin(user))
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)