import React from 'react'
import { connect } from 'react-redux'
import { Cart } from './cart'
import { Link } from 'react-router-dom'
import { fetchItems, putItems, updateQuantity, removeItem } from '../store'


export const Checkout = (props) => {
    let winesInCart = props.winesInCart;
    const loggedInUser = props.loggedInUser;
    const mergeCarts = props.mergeCarts;
    const loadCart = props.loadCart;
    const update = props.update;
    const remove = props.removeItem;
    return (
        <div>

            <Cart winesInCart={winesInCart} loggedInUser={loggedInUser} mergeCarts={mergeCarts} loadCart={loadCart} update={update} remove={remove} />
            <div>
                <h1>Checkout</h1>
            </div>
            <div>
                Ship to
                </div>
            {loggedInUser.id ?
                <div>
                    <h6>{loggedInUser.name}</h6>
                    <h6>{loggedInUser.place.address}</h6>
                    <h6>{loggedInUser.place.city}, {loggedInUser.place.state}</h6>
                    <h6>{loggedInUser.place.country} {loggedInUser.place.zipcode}</h6>
                    <h6>Shipping email: {loggedInUser.email}</h6>
                    <h6>Phone Number: {loggedInUser.place.phone}</h6>
                    <Link to={`/shipping/${loggedInUser.id}/${loggedInUser.placeId}`}>Edit</Link>
                </div>
                :

                <div>
                    <Link to={`/shipping/0`}>Add your shipping information </Link>
                </div>
            }


            <div>
                <Link to="/payment">Add Payment</Link>
            </div>
        </div>
    )
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


export default connect(mapState, mapDispatch)(Checkout)
