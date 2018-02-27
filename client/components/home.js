import React from 'react'
import { connect } from 'react-redux'


export const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Home)
