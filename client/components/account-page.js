import React from 'react'
import { Link } from 'react-router-dom'

export const AccountPage = () => {
    return (
        <div>
            <h1>Account Page</h1>
            <div>
                <Link to="/cart">Cart</Link>
            </div>
            <div>
                <Link to="/order-history">Order History</Link>
            </div>
        </div>
    )
}


export default AccountPage
