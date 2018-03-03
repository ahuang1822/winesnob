import React from 'react'
import { connect } from 'react-redux'
import { postItem } from '../store'
import { selectWineById } from '../store/wine'

export const SelectedWine = (props) => {
    const wine = props.data;
    //console.log('props -------------->', props);
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
             <div>
            <button onClick={() => {
                props.addToCart(wine)
            }} > Add to Cart </button>
            </div>
        </div>
    )
}

class SingleWineContainer extends React.Component {
    componentDidMount() {
        this.props.selectWineById(this.props.match.params.id)
    }

    render() {
        if (!this.props.selectedWine) return <h1>Loading...</h1>

        return <SelectedWine selectedWine={this.props.selectedWine} />
    }
}


class Loader extends React.Component {
    componentDidMount() {
        this.props.load(this.props.match.params.id)
            .catch(error => this.setState({ error }))
    }

    render() {
        if (!this.props.data) return <h1>Loading...</h1>


        const Render = this.props.Render
        return <Render data={this.props.data} addToCart={this.props.addToCart} fetchOrder={this.props.fetchOrder} />
    }
}

const mapState = (state) => {

    return {
        data: state.wine.selectedWine.wine,
        Render: SelectedWine,
    }
}

const mapDispatch = (dispatch) => {
    return {
        load(id) {
            return dispatch(selectWineById(id))
        },
        addToCart(item) {
             dispatch(postItem(item))
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)