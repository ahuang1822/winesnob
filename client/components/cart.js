import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


export const Cart = (props) => {
    
    return (
        <div>
            <h1>Cart</h1>
            <Link to="/checkout">Checkout</Link>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Cart)
