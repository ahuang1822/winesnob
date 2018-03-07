import React from 'react'
import { connect } from 'react-redux'
import { edit, updateUserPlace } from '../store'


export const EditUserPlace = (props) => {
    const user = props.loggedInUser || {};
    return (
        <div>
            <form onSubmit={(event) => {
                props.handleSubmitUser(event)
                props.handleSubmitPlace(event)
            }}>
                <div>
                <h3>Shipping Info:</h3>
                    <div>
                        <label className="form-labels">First Name:</label>
                        <input
                            name="firstName"
                            type="text"
                            defaultValue={user.firstName}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Last Name:</label>
                        <input
                            name="lastName"
                            type="text"
                            defaultValue={user.lastName}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Email:</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={user.email}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Address:</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={user.place.address}
                        />
                    </div>
                    <div>
                        <label className="form-labels">City:</label>
                        <input
                            name="city"
                            type="text"
                            defaultValue={user.place.city}
                        />
                    </div>
                    <div>
                        <label className="form-labels">State:</label>
                        <input
                            name="state"
                            type="text"
                            defaultValue={user.place.state}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Zip Code:</label>
                        <input
                            name="zipcode"
                            type="number"
                            defaultValue={user.place.zipcode}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Country:</label>
                        <input
                            name="country"
                            type="text"
                            defaultValue={user.place.country}
                        />
                    </div>
                    <div>
                        <label className="form-labels">Phone:</label>
                        <input
                            name="phone"
                            type="tel"
                            defaultValue={user.place.phone}
                        />
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
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
    handleSubmitUser(event) {
        event.preventDefault()
        const id = ownProps.match.params.id
        const userInfo = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
        }
        dispatch(edit(id, userInfo))
    },
    handleSubmitPlace(event) {
        event.preventDefault()
        const placeId = ownProps.match.params.placeId
        const userId = ownProps.match.params.id
        const placeInfo = {
            address: event.target.address.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value,
            phone: event.target.phone.value,
        }
        dispatch(updateUserPlace(placeId, userId, placeInfo))
    }
})


export default connect(mapState, mapDispatch)(EditUserPlace)
