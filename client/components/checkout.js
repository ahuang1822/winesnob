import React from 'react'
import { connect } from 'react-redux'
import { Cart } from './cart'
import { Link } from 'react-router-dom'
import { fetchItems, putItems, updateQuantity, removeItem, clearGuestAddress, clearGuestPayment, updateOrder } from '../store'


export const Checkout = (props) => {
    const loggedInUser= props.loggedInUser || {}
    let { winesInCart } = props;
    const { 
        guestPayment,
        guestAddress,
        mergeCarts,
        loadCart,
        update,
        removeItem,
        removePayment,
        removeAddress,
        changeOrderStatus,
         } = props;
    return (
        <div>
            <Cart winesInCart={winesInCart} loggedInUser={loggedInUser} mergeCarts={mergeCarts} loadCart={loadCart} update={update} removeItem={removeItem} />
            <div>
                <h1>Checkout</h1>
            </div>
            {loggedInUser.id ?
                <div>
                    <div>
                        <h4>Ship to</h4>
                    </div>
                    <div>
                        <h6>{loggedInUser.name}</h6>
                        <h6>{loggedInUser.place.address}</h6>
                        <h6>{loggedInUser.place.city}, {loggedInUser.place.state}</h6>
                        <h6>{loggedInUser.place.country} {loggedInUser.place.zipcode}</h6>
                        <h6>Shipping email: {loggedInUser.email}</h6>
                        <h6>Phone Number: {loggedInUser.place.phone}</h6>
                        <Link to={`/shipping/${loggedInUser.id}/${loggedInUser.placeId}`}>Edit</Link>
                    </div>
                </div>
                : null
            }
            {guestAddress.city ?
                <div>
                    <div>
                        <h4>Ship to</h4>
                    </div>
                    <div>
                        <h6>{guestAddress.firstName} {guestAddress.lastName}</h6>
                        <h6>{guestAddress.address}</h6>
                        <h6>{guestAddress.city}, {guestAddress.state}</h6>
                        <h6>{guestAddress.country} {guestAddress.zipcode}</h6>
                        <h6>Shipping email: {guestAddress.email}</h6>
                        <h6>Phone Number: {guestAddress.phone}</h6>
                        <Link to={`/shipping/${loggedInUser.id}`}>Edit</Link>
                        <div>
                            <button onClick={removeAddress}>Remove</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
            {!guestAddress.city && !loggedInUser.place ?

                <div>
                    <Link to={`/shipping/${loggedInUser.id}`}>Add your shipping information </Link>
                </div>
                : null
            }
            {loggedInUser.payment ?
                <div>
                    <h4>Payment</h4>
                    <div>
                        <h6>{loggedInUser.payment.cardCompany} ending in {loggedInUser.payment.cardNumber.slice(-4)}</h6>
                        <h6>Expiration: {loggedInUser.payment.expiration}</h6>
                        <h6>Security: {loggedInUser.payment.security}</h6>
                        <h4>Billing Information</h4>
                        <h6>{loggedInUser.payment.address}</h6>
                        <h6>{loggedInUser.payment.city}, {loggedInUser.payment.state}</h6>
                        <h6>{loggedInUser.payment.country} {loggedInUser.payment.zipcode}</h6>
                        <Link to={`/payment/${loggedInUser.id}/${loggedInUser.paymentId}`}>Edit</Link>
                    </div>
                </div>
                : null
            }
            {!loggedInUser.payment && !guestPayment.cardCompany ?
                <div>
                    <Link to={`/payment/${loggedInUser.id}`}>Add Payment</Link>
                </div>
                : null
            }
            <div>
                {guestPayment.cardCompany ?
                    <div>
                        <div>
                            <h4>Payment</h4>
                        </div>
                        <div>
                            <h6>{guestPayment.cardCompany} ending in {guestPayment.cardNumber.slice(-4)}</h6>
                            <h6>Expiration: {guestPayment.expiration}</h6>
                            <h6>Security: {guestPayment.security}</h6>
                            <h4>Billing Information</h4>
                            <h6>{guestPayment.address}</h6>
                            <h6>{guestPayment.city}, {guestPayment.state}</h6>
                            <h6>{guestPayment.country} {guestPayment.zipcode}</h6>
                            <Link to={`/payment/${loggedInUser.id}`}>Edit</Link>
                            <div>
                                <button onClick={removePayment}>Remove</button>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            {
                loggedInUser.payment && loggedInUser.place ?
                    <button onClick={(event) => changeOrderStatus(event, winesInCart[0].orderId)}>Complete Purchase</button>
                    : null
            }
            {
                guestPayment.cardCompany && guestAddress.city ?
                    <button onClick={(event) => changeOrderStatus(event, winesInCart[0].orderId)}>Complete Purchase</button>
                    : null
            }
        </div>
    )
}


const mapState = (state) => {
    return {
        winesInCart: state.cart.items,
        loggedInUser: state.user.loggedInUser,
        guestPayment: state.user.guestPayment,
        guestAddress: state.user.guestAddress
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
        },
        removeAddress() {
            dispatch(clearGuestAddress())
        },
        removePayment() {
            dispatch(clearGuestPayment())
        },
        changeOrderStatus(event, id) {
            event.preventDefault()
            dispatch(updateOrder(id, { status: 'ordered' }))
        }
    }
}


export default connect(mapState, mapDispatch)(Checkout)
