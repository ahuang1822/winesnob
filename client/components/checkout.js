import React from 'react'
import { connect } from 'react-redux'
import { Cart } from './cart'


export const Checkout = (props) => {
    let winesInCart = props.winesInCart;
    const loggedInUser = props.loggedInUser;
    const mergeCarts = props.mergeCarts;
    const loadCart = props.loadCart;
    const update = props.update;
    const remove = props.removeItem;
    return (
        <div>
            <div>
            <h1>Checkout</h1>
            </div>
            <div>
            Ship to
            </div>
            <form>
            <div>
            <div>
              <label>First Name:</label>
              <input
                name="firstName"
                type="text"
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                name="lastName"
                type="text"
              />
              <div>
              <label>Email:</label>
              <input
                name="email"
                type="email"
              />
            </div>
            </div>
            </div>
            <div>
              <label>Address:</label>
              <input
                name="address"
                type="text"
              />
            </div>
            <div>
              <label>City:</label>
              <input
                name="city"
                type="text"
              />
            </div>
            <div>
              <label>State:</label>
              <input
                name="state"
                type="text"
              />
              <div>
              <label>Zip Code:</label>
              <input
                name="zipcode"
                type="number"
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                name="country"
                type="text"
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                name="phone"
                type="tel"
              />
            </div>
            <button type="submit">Save</button>
            </div>
          </form>




        </div>
    )
}



const mapState = (state) => {
    console.log('state: ', state);
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
        removeItem(event, id){
            event.preventDefault()
            dispatch(removeItem(id))
        }
    }
}


export default connect(mapState, mapDispatch)(Checkout)



// <Cart winesInCart={winesInCart} loggedInUser={loggedInUser} mergeCarts={mergeCarts} loadCart={loadCart} update={update} remove={remove} />