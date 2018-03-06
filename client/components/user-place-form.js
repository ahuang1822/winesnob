import React from 'react'
import { connect } from 'react-redux'
import { edit, editUserPlace } from '../store'


export const UserPlace = (props) => {
    const user = props.loggedInUser;
    return (
        <div>
            <form onSubmit={(event) => {
                props.handleSubmitUser(event)
                props.handleSubmitPlace(event)
            }}>
                <div>
                    <div>
                        <label>First Name:</label>
                        <input
                            name="firstName"
                            type="text"
                            defaultValue={user.firstName}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            name="lastName"
                            type="text"
                            defaultValue={user.lastName}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={user.email}
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={user.place.address}
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input
                            name="city"
                            type="text"
                            defaultValue={user.place.city}
                        />
                    </div>
                    <div>
                        <label>State:</label>
                        <input
                            name="state"
                            type="text"
                            defaultValue={user.place.state}
                        />
                    </div>
                    <div>
                        <label>Zip Code:</label>
                        <input
                            name="zipcode"
                            type="number"
                            defaultValue={user.place.zipcode}
                        />
                    </div>
                    <div>
                        <label>Country:</label>
                        <input
                            name="country"
                            type="text"
                            defaultValue={user.place.country}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
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
        const placeInfo = {
            address: event.target.address.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value,
            phone: event.target.phone.value,
        }
        dispatch(editUserPlace(placeId, placeInfo))
    }
})

export default connect(mapState, mapDispatch)(UserPlace)



// <div>
// <label>Address:</label>
// <input
//     name="address"
//     type="text"
//     defaultValue={user.place.address}
// />
// </div>
// <div>
// <label>City:</label>
// <input
//     name="city"
//     type="text"
//     defaultValue={user.place.city}
// />
// </div>
// <div>
// <label>State:</label>
// <input
//     name="state"
//     type="text"
//     defaultValue={user.place.state}
// />
// </div>
// <div>
//     <label>Zip Code:</label>
//     <input
//         name="zipcode"
//         type="number"
//         defaultValue={user.place.zipcode}
//     />
// </div>
// <div>
//     <label>Country:</label>
//     <input
//         name="country"
//         type="text"
//         defaultValue={user.place.country}
//     />
// </div>
// <div>
//     <label>Phone:</label>
//     <input
//         name="phone"
//         type="tel"
//         defaultValue={user.place.phone}
//     />
// </div>