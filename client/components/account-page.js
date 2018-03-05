import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const AccountPage = () => {
    console.log('hello');
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

const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(AccountPage)
