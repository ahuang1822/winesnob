import React from 'react'
import { connect } from 'react-redux'


export const SelectedWine = (props) => {
    const wine = props.selectedWine;
    return (
        <div>
            <h3>{wine.name}</h3>
            <div>
                <h5>
                    {wine.description}
                </h5>
            </div>
            <div>
                <img src={wine.img} />
            </div>
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
    )
}

const mapState = (state) => {

    return {
        selectedWine: state.wine.selectedWine.wine
    }
}


export default connect(mapState)(SelectedWine)
