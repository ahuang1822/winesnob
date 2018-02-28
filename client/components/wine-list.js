import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectWineById } from '../store/wine'

export const WineList = (props) => {
    const wineList = props.wineListOnProps;
    console.log(wineList)
     return (
        <div>
            <ul>
                {wineList.map(wine => (
                    <div key={wine.id} onClick={() => props.selectWine(wine.id)}>
                        <div>
                            <img src={wine.img} />
                        </div>
                        <div><h3>{wine.name}</h3></div>
                        <div>
                            <h5>
                                {`${wine.vintage} ${wine.varietal}`}
                            </h5>
                        </div>
                         <div>
                            <h5>
                                {`${wine.place.city}, ${wine.place.state} ${wine.place.country}`}
                            </h5>
                        </div> 
                        <div>
                            <h6>
                                size: {wine.size}
                            </h6>
                        </div>
                        <div>
                            <h6>
                                price: ${wine.price}
                            </h6>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}


const mapState = (state) => {

    return {
        wineListOnProps: state.wine.wineList
    }
}


const mapDispatch = (dispatch) => {
    return {
        selectWine(id) {
            dispatch(selectWineById(id))
        }
    }
}


export default connect(mapState, mapDispatch)(WineList)
