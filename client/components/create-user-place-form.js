import React from 'react'
import { connect } from 'react-redux'
import { EditUserPlace } from './edit-user-place-form'
import { updateGuestAddress } from '../store'


export const CreateUserPlace = (props) => {
    const loggedInUser = props.loggedInUser || { place: {} };
    const { handleSubmitUser, 
            handleSubmitPlace } = props;
    return (
        <div>
            <EditUserPlace loggedInUser={loggedInUser} handleSubmitUser={handleSubmitUser} handleSubmitPlace={handleSubmitPlace} />
        </div>
    )
}


const mapState = (state) => {
    return {
        loggedInUser: state.user.loggedInUser
    }
}


const mapDispatch = (dispatch) => ({
    handleSubmitUser(event) {
        event.preventDefault()
        const userInfo = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            address: event.target.address.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value,
            phone: event.target.phone.value,
        }
        dispatch(updateGuestAddress(userInfo))
    },
    handleSubmitPlace(event) {
        event.preventDefault()
    }
})


export default connect(mapState, mapDispatch)(CreateUserPlace)
