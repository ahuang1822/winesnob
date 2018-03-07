import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../store'


export const Payment = (props) => {
	return (
		<div>
			<form>
				<div>
					<div>
						<label>Creditcard Number:</label>
						<input
							name="ccNum"
							type="number"
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
					<div>
						<label>Phone:</label>
						<input
							name="phone"
							type="tel"
						/>
					</div>
					<button type="submit">Save</button>
				</div>
			</form>
		</div>
	);
}


const mapState = ({ loggedInUser }) => ({ loggedInUser })

const mapDispatch = (dispatch) => ({
	signupSubmit(event, order) {
		event.preventDefault()
		const userInfo = {
			firstName: event.target.firstName.value,
			lastName: event.target.lastName.value,
			email: event.target.email.value,
			password: event.target.password.value,
			address: event.target.address.value,
			city: event.target.city.value,
			state: event.target.state.value,
			country: event.target.country.value,
			phone: event.target.phone.value,
		}
		dispatch(signup(userInfo, order))
	}
})

export default connect(mapState, mapDispatch)(Payment)
