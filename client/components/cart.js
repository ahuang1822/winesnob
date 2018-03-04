import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchItems } from '../store/cart'


class Cart extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
      this.props.loadCart()
    }
    
    
    
    render(){
    let winesInCart = this.props.winesInCart;
    const loggedInUser = this.props.loggedInUser;
    return (
        <div>
        <h1>Cart</h1>
       {
           loggedInUser.id ?
             <h6>There have been items added to the shopping cart as a guest. Would you like to merge these items? <Link to="/cart">Merge Carts</Link></h6>
            : <div>Guest</div>
       }
            {
                winesInCart.map(wine => {
                 return (
                    <div key={wine.id}>
                        <h2>{wine.wine.vintage} {wine.wine.name} {wine.wine.varietal}</h2>
                    </div>
                 )})
                }
            <Link to="/checkout">Checkout</Link>
        </div>
    )
}
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
        loadCart () {
          console.log('loadCart')
          dispatch(fetchItems())
        }
    }
}


export default connect(mapState, mapDispatch)(Cart)
