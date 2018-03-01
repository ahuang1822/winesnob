import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleOrder } from '../store/order'

class OrderDetails extends React.Component {

  componentDidMount() {
    console.log('match: ', this.props.match)
    const orderId = Number(this.props.match.params.orderId)
    console.log('orderId: ', orderId);
    this.props.fetchSingleOrder(orderId);
  }

  render() {
    console.log('orderOnProps: ', this.props.orderOnProps)
    if (!this.props.orderOnProps.lists) {
      return <h1>Loading...</h1>
    }
    else {
      return (
        <div>
          <h1>Order Details</h1>
          <div>
            {
              this.props.orderOnProps.lists && this.props.orderOnProps.lists.map(list => {
                return (
                  <div key={list.id}>
                    <img src={list.wine.img} />
                    <Link to={`/winelist/${list.wine.id}`}>{list.wine.name}</Link>
                    <h2>Wine Name: {list.wine.name}</h2>
                    <h2>Vintage: {list.wine.vintage}</h2>
                    <h2>Varietal: {list.wine.varietal}</h2>
                    <h2>Size: {list.wine.size}</h2>
                    <h2>Bottles Ordered: {list.quantity}</h2>
                    <h2>Price: {list.wine.price}</h2>
                    <Link to={`/reviews/${list.wine.id}`}>Write a Review for {list.wine.name}</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}


const mapState = (state) => {
  console.log('state: ', state);
  return {
    orderOnProps: state.order.order
  }
}

const mapDispatch = (dispatch) => (
  {
    fetchSingleOrder: (id) => {
      dispatch(fetchSingleOrder(id));
    }
  });


export default connect(mapState, mapDispatch)(OrderDetails)
