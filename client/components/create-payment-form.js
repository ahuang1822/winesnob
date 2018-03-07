import React from 'react'
import { connect } from 'react-redux'
import { addPayment, updateGuestPayment } from '../store'


export const CreatePayment = (props) => {
    const user = props.loggedInUser.payment || {};
    return (
        <div>
            <form onSubmit={(event) => props.handleSubmit(event, props.loggedInUser)}>
                <div>
                    <div><h3>Credit Card Information</h3></div>
                    <div>
                        <label className="form-labels">
                            Creditcard Type:
                        </label>
                        <input
                            name="type"
                            type="text"
                            defaultValue={user.cardCompany}
                        />
                    </div>
                    <div>
                        <label className="form-labels">
                            Creditcard Number:
                        </label>
                        <input
                            name="cc"
                            type="text"
                            defaultValue={user.cardNumber}
                        />
                    </div>
                    <div>
                        <label className="form-labels">
                            Expiration Date:
                        </label>
                        <input
                            name="exp"
                            type="text"
                            defaultValue={user.expiration}
                        />
                        <div>
                            <label className="form-labels">
                                Security Number:
                            </label>
                            <input
                                name="security"
                                type="integer"
                                defaultValue={user.security}
                            />
                        </div>
                    </div>
                </div>
                <div><h3>Billing Address</h3></div>
                <div>
                    <label className="form-labels">
                        Address:
                    </label>
                    <input
                        name="address"
                        type="text"
                        defaultValue={user.address}
                    />
                </div>
                <div>
                    <label className="form-labels">
                        City:
                    </label>
                    <input
                        name="city"
                        type="text"
                        defaultValue={user.city}
                    />
                </div>
                <div>
                    <label className="form-labels">
                        State:
                    </label>
                    <input
                        name="state"
                        type="text"
                        defaultValue={user.state}
                    />
                    <div>
                        <label className="form-labels">
                            Zip Code:
                        </label>
                        <input
                            name="zipcode"
                            type="number"
                            defaultValue={user.zipcode}
                        />
                    </div>
                    <div>
                        <label className="form-labels">
                            Country:
                        </label>
                        <input
                            name="country"
                            type="text"
                            defaultValue={user.country}
                        />
                    </div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}


const mapState = (state) => {
    return {
        loggedInUser: state.user.loggedInUser
    }
}


const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit(event, user) {
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
        user.id ?
            dispatch(addPayment(paymentInfo, userId))
            :
            dispatch(updateGuestPayment(paymentInfo))
    }
})


export default connect(mapState, mapDispatch)(CreatePayment)
