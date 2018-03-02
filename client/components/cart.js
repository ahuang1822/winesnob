import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


export const Cart = (props) => {
   console.log('Cart Props---------------------', props.winesInCart)
   let winesInCart = props.winesInCart;

   return (
       <div>




           {
               winesInCart.map(wine => (
                   <div key={wine.id}>
                       <h2>{wine.id} {wine.price} {wine.quantity} {wine.total}</h2>
                   </div>
               ))
           }
           <h1>Cart</h1>
           <Link to="/checkout">Checkout</Link>
       </div>
   )
}

const mapState = (state) => {
    return {
       winesInCart: state.cart.items
    }
}


export default connect(mapState)(Cart)