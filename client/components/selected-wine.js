import React from 'react'
import { connect } from 'react-redux'
import { postItem } from '../store'
<<<<<<< HEAD
import { fetchItems } from '../store/cart'
import { selectWineById } from '../store/wine'


export const SelectedWine = (props) => {
		const wine = props.data
    console.log('props -------------->', props);
=======
import { selectWineById } from '../store/wine'
import { Link } from 'react-router-dom'

export const SelectedWine = (props) => {
    const wine = props.data;
    const user = props.user;
    console.log('user: ', user);
>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7
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
<<<<<<< HEAD
            <button onClick={() => props.addToCart(wine)} > Add to Cart </button>
            </div>
=======
            <button onClick={(event) => {
                props.addToCart(event, wine)
            }} > Add to Cart </button>
            </div>

>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7
        </div>
    )
}

<<<<<<< HEAD
class SingleWineContainer extends React.Component {
    componentDidMount() {
        this.props.selectWineById(this.props.match.params.id)
    }

    render() {
        if (!this.props.selectedWine) return <h1>Loading...</h1>
=======
// class SingleWineContainer extends React.Component {
//     componentDidMount() {
//         this.props.selectWineById(this.props.match.params.id)
//     }
>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7

//     render() {
//         if (!this.props.selectedWine) return <h1>Loading...</h1>

//         return <SelectedWine selectedWine={this.props.selectedWine} />
//     }
// }

class Loader extends React.Component {
    componentDidMount() {
        this.props.load(this.props.match.params.id)
            .catch(error => this.setState({ error }))
    }

    render() {
        if (!this.props.data) return <h1>Loading...</h1>
        const Render = this.props.Render
<<<<<<< HEAD
        return <Render data={this.props.data} addToCart={this.props.addToCart} loadCart={this.props.loadCart}/>
=======
        return <Render data={this.props.data} addToCart={this.props.addToCart} fetchOrder={this.props.fetchOrder} user={this.props.user}/>
>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7
    }
}

const mapState = (state) => {
    console.log("state", state.user.loggedInUser)
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
<<<<<<< HEAD
        addToCart(item) {
           // console.log('props item-----------> ', item);
=======
        addToCart(event, item) {
             event.preventDefault()
>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7
             dispatch(postItem(item))
        },
        loadCart () {
          dispatch(fetchItems())
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)