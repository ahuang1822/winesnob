import React from 'react'
import { connect } from 'react-redux'
import { selectWineById } from '../store'
import { Link } from 'react-router-dom'

export const WineList = (props) => {
    const wineList = props.wineListOnProps;
    const user = props.user
    return (
        <div>
            {
                user.isAdmin
                    ?
                    <div>
                        <div>
                            <Link to={'/winelist/add-wine'}>Add Wine</Link>
                        </div>
                        <ul>
                            {wineList.map(wine => {
                                if (wine.quantity) {
                                    return (<Link to={`/winelist/${wine.id}`} key={wine.id}>
                                        <div>
                                            <img src={wine.img} />
                                        </div>
                                        <div>
                                            <h3>{wine.name}</h3>
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
                                    </Link>)
                                } else {
                                    return (
                                        <Link to={`/winelist/${wine.id}`} key={wine.id}>
                                            <div>
                                                <h3>{wine.name}</h3>
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
                                            <h4>Sold Out</h4>
                                        </Link>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    :
                    <div>
                        <ul>
                            {wineList.map(wine => {
                                if (wine.quantity) {
                                    return (<Link to={`/winelist/${wine.id}`} key={wine.id}>
                                        <div>
                                            <img src={wine.img} />
                                        </div>
                                        <div>
                                            <h3>{wine.name}</h3>
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
                                    </Link>)
                                } else {
                                    return (
                                        <div>
                                            <div>
                                                <h3>{wine.name}</h3>
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
                                            <h4>Sold Out</h4>
                                        </div>
                                    )
                                }
                            })}
                        </ul>
                    </div>
            }

        </div>
    )
}

const mapState = (state) => {
    return {
        wineListOnProps: state.wine.wineList,
        user: state.user.loggedInUser
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

