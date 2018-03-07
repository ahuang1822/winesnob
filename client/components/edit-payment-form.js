import React from 'react'
import { connect } from 'react-redux'
import { updatePayment } from '../store'
import { CreatePayment } from './create-payment-form'


export const EditPayment = (props) => {
    const loggedInUser = props.loggedInUser || { place: {} };
    const { handleSubmit } = props;
    return (
        <div>
            <h4>Edit payment</h4>
            <div>
                <CreatePayment loggedInUser={loggedInUser} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}


const mapState = (state) => {
    return {
        loggedInUser: state.user.loggedInUser
    }
}


const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit(event) {
        event.preventDefault()
        const userId = ownProps.match.params.id;
        const paymentId = ownProps.match.params.paymentId;
        const paymentInfo = {
            cardCompany: event.target.type.value,
            cardNumber: event.target.cc.value,
            expiration: event.target.exp.value,
            security: event.target.security.value,
            address: event.target.address.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value,
            zipcode: event.target.zipcode.value,
        }
        dispatch(updatePayment(paymentInfo, userId, paymentId))
    }
})


export default connect(mapState, mapDispatch)(EditPayment)
