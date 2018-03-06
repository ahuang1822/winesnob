import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const AccountPage = (props) => {
    const user = props.user
    return (
        <div>
            <h1>Account Page</h1>
            <div>
                <Link to="/cart">Cart</Link>
            </div>
            <div>
                <Link to="/order-history">Order History</Link>
            </div>
            {
                user.isAdmin &&
                <div>
                    <div>
                        <Link to="/account-page/add-admin">Add Admin</Link>
                    </div>
                    <div>
                        <Link to="/account-page/delete-user">Delete user</Link>
                    </div>
                </div>
            }
            <div>
                <Link to="/account-page/change-password">Change Password</Link>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        wineListOnProps: state.wine.wineList,
        user: state.user.loggedInUser
    }
}

export default connect(mapState)(AccountPage)
