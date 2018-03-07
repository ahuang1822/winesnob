import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchItems, putItems, updateQuantity, removeItem } from '../store'


export class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isClicked: true
        }
    }
    componentDidMount() {
        this.props.loadCart(event)
    }
    render() {
        let winesInCart = this.props.winesInCart;
        const loggedInUser = this.props.loggedInUser;
        const mergeCarts = this.props.mergeCarts;
        const loadCart = this.props.loadCart;
        const update = this.props.update;
        const remove = this.props.removeItem;
        let counter = 0;
        return (
            <div>
                <h1>Cart</h1>
                {
                    loggedInUser.id && this.state.isClicked ?
                        <h6>There have been items added to the shopping cart as a guest. Would you like to merge these items? <Link
                            to="/cart"
                            onClick={(event) => {
                                mergeCarts(event, { merging: true });
                                this.setState({ isClicked: false });
                            }}>Merge Carts</Link></h6>
                        : null
                }
                {
                    winesInCart.map(wine => {
                        counter += wine.quantity * wine.wine.price
                        return (
                            <div key={wine.id}>
                                <h2>{wine.wine.vintage} {wine.wine.name} {wine.wine.varietal} quantity: {wine.quantity} <button onClick={(event) => {
                                    update(event, wine.id, ++wine.quantity)
                                }} >+</button><button onClick={(event) => {
                                    update(event, wine.id, --wine.quantity)
                                }} >-</button> <button onClick={(event) => {
                                    remove(event, wine.id)
                                }}>Remove</button>
                                    ${wine.quantity * wine.wine.price}
                                </h2>
                            </div>
                        )
                    })
                }
                <h4>Total: ${counter} </h4>
                <Link to="/checkout">Checkout</Link>
            </div>
        )
    }
}


const mapState = (state) => {
    return {
        winesInCart: state.cart.items,
        loggedInUser: state.user.loggedInUser
    }
}


const mapDispatch = (dispatch) => {
    return {
        loadCart(event) {
            event.preventDefault()
            dispatch(fetchItems())
        },
        mergeCarts(event, body) {
            event.preventDefault()
            dispatch(putItems(body))
        },
        update(event, id, numItems) {
            event.preventDefault()
            if (numItems > 0) {
                dispatch(updateQuantity(id, { quantity: numItems }))
            }
        },
        removeItem(event, id) {
            event.preventDefault()
            dispatch(removeItem(id))
        }
    }
}


export default connect(mapState, mapDispatch)(Cart)
