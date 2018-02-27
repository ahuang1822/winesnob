import React from 'react'
import { connect } from 'react-redux'


export const WineList = (props) => {
    const wineList = props.wineListOnProps;
    return (
        <div>
            <ul>
                { wineList.map(wine => (

                    <div key={wine.id}>
                    <li>{wine.name}</li>
                    <div>
                    <img src={wine.img} />
                    </div>
                    </div>
                )) }
            </ul>
        </div>
    )
}


const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


export default connect(mapState)(WineList)
