import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export const OrderDetails= () => {
    
    return (
        <div>
            <h1>Order Details</h1>
            <Link to="selected-wine">wine name</Link>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(OrderDetails)
