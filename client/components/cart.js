import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchItems } from '../store/cart'

class Cart extends React.Component {

	componentDidMount() {
		this.props.loadCart();
	}
	

render() {
	let winesInCart = this.props.winesInCart;
	console.log('Cart Props--------', this.props.winesInCart)
	return (

		<div>
			{winesInCart &&
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
}


const mapState = (state) => {
	return {
		winesInCart: state.cart.items
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadCart() {
			dispatch(fetchItems());
		}
	}
};


export default connect(mapState, mapDispatch)(Cart)