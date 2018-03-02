import React from 'react'
import { connect } from 'react-redux'


export const Home = () => {
    return (
        <div>
            <h1>Come get drunk with us. We got the goods.</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Home)
