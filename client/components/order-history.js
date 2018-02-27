import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export const OrderHistory = (props) => {
    
    return (
        <div>
            <h1>Order History</h1>
            <div>
                <Link to="/order-details">Order Details</Link>
            </div>
            <div>
                <Link to="/winelist/1">Selected Wine</Link>
            </div>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(OrderHistory)
