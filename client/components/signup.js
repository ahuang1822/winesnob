import React from 'react'
import { connect } from 'react-redux'


export const Signup = (props) => {
    
    return (
        <div>
            <h1>Signup</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Signup)
