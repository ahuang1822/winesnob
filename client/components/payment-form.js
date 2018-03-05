import React from 'react'
import { connect } from 'react-redux'
import { signup, addPayment } from '../store'


export const Payment = (props) => {
  return (
    <div>
        <form onSubmit={props.handleSubmit}>
        <div>
        <div><h6>Creditcard Information</h6></div>
        <div>
        <label>Creditcard Type:</label>
        <input
            name="type"
            type="text"
        />
    </div>
            <div>
                <label>Creditcard Number:</label>
                <input
                    name="cc"
                    type="text"
                />
            </div>
            <div>
                <label>Expiration Date:</label>
                <input
                    name="exp"
                    type="text"
                />
                <div>
                    <label>Security Number:</label>
                    <input
                        name="security"
                        type="integer"
                    />
                </div>
            </div>
        </div>
        <div><h6>Billing Information</h6></div>
        <div>
            <label>Address:</label>
            <input
                name="address"
                type="text"
            />
        </div>
        <div>
            <label>City:</label>
            <input
                name="city"
                type="text"
            />
        </div>
        <div>
            <label>State:</label>
            <input
                name="state"
                type="text"
            />
            <div>
                <label>Zip Code:</label>
                <input
                    name="zipcode"
                    type="number"
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    name="country"
                    type="text"
                />
            </div>
            <button type="submit">Save</button>
        </div>
    </form>
    </div>
  );
}


const mapState = ({ loggedInUser }) => ({ loggedInUser })

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(event){
   event.preventDefault()
   const userId = ownProps.match.params.id;
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
    dispatch(addPayment(paymentInfo, userId))
  }
})

export default connect(mapState, mapDispatch)(Payment)
