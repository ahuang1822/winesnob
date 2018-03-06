import React from 'react'
import { connect } from 'react-redux'
import { postItem } from '../store'
import { selectWineById } from '../store/wine'
import { Link } from 'react-router-dom'

export const SelectedWine = (props) => {
    const wine = props.data;
    const user = props.user;
    return (
        <div>
            {
                user.isAdmin
                    ? <h3>{wine.name} <Link to={`/winelist/${wine.id}/edit`}>Edit Wine</Link></h3>
                    : <h3>{wine.name}</h3>
            }
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
            <div>
                <button onClick={(event) => {
                    props.addToCart(event, wine)
                }} > Add to Cart </button>
            </div>

        </div>
    )
}


class Loader extends React.Component {
    componentDidMount() {
        this.props.load(this.props.match.params.id)
            .catch(error => this.setState({ error }))
    }

    render() {
        if (!this.props.data) return <h1>Loading...</h1>
        const Render = this.props.Render
        return <Render data={this.props.data} addToCart={this.props.addToCart} fetchOrder={this.props.fetchOrder} user={this.props.user} />
    }
}


const mapState = (state) => {
    return {
        data: state.wine.selectedWine.wine,
        user: state.user.loggedInUser,
        Render: SelectedWine
    }
}


const mapDispatch = (dispatch) => {
    return {
        load(id) {
            return dispatch(selectWineById(id))
        },
        addToCart(event, item) {
            event.preventDefault()
            dispatch(postItem(item))
        }
    }
}


export default connect(mapState, mapDispatch)(Loader)