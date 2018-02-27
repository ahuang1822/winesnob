import React from 'react'
import { connect } from 'react-redux'


export const SelectedWine = (props) => {
    const wine = props.selectedWine;
    console.log('wine', wine)
    return (
        <div>
            <h1>{wine.name}</h1>
            <div>
                <h3>
                    {wine.description}
                </h3>
            </div>
            <div>
                <img src={wine.img} />
            </div>
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


        </div>
    )
}
const mapState = (state) => {

    return {
        selectedWine: state.wine.selectedWine
    }
}


export default connect(mapState)(SelectedWine)
