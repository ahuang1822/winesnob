import React from 'react'
import { connect } from 'react-redux'


export const Review = () => {
    return (
        <div>
            <h1>Review</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        selectedWine: state.wine.selectedWine
    }
}


export default connect(mapState)(Review)