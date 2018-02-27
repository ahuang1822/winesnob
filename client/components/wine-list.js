import React from 'react'
import { connect } from 'react-redux'


export const WineList = (props) => {
    const wine = props.wineList;
    return (
        <div>
            <ul>
                {wine.map(wine => (

                    <div key={wine.id}>
                    <li>{wine.name}</li>
                    <div><img src={wine.img}/></div>
                    </div>
                ))}
            </ul>
        </div>
    )
}


const mapState = (state) => {

    return {
        wineList: state.wine.wineList
    }
}


export default connect(mapState)(WineList)


