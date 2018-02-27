import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectWineById } from '../store/wine'

export const WineList = (props) => {
    const wineList = props.wineListOnProps;
     return (
        <div>
            <ul>
                {wineList.map(wine => (
                    <div key={wine.id} onClick={() => props.selectWine(wine.id)}>
                        <div>
                            <img src={wine.img} />
                        </div>
                        <Link to={`/winelist/${wine.id}`}>{wine.name}</Link>
                        <div>
                            <h3>
                                {`${wine.vintage} ${wine.varietal}`}
                            </h3>
                        </div>
                        {/* <div>
                            <h3>
                                {`${wine.place.city} ${wine.place.state} ${wine.place.country}`}
                            </h3>
                        </div> */}
                        <div>
                            <h3>
                                size: {wine.size}
                            </h3>
                        </div>
                        <div>
                            <h3>
                                price: ${wine.price}
                            </h3>
                        </div>
                        <Link to={`/reviews/${wine.id}`}>reviews</Link>
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
