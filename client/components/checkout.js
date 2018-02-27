import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export const Checkout = () => {
    
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Checkout)
