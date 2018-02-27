import React from 'react'
import { connect } from 'react-redux'


export const Login = (props) => {
    
    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}
const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(Login)
