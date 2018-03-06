import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchOrder } from '../store'

class OrderHistory extends React.Component {

  componentDidMount() {
    this.props.fetchOrder();
  }

  render() {
    const myOrders = this.props.ordersOnProps;
    if (!this.props.ordersOnProps) {
      return <h1>You have no orders</h1>
    }
    else {
      return (
        <div>
          <h1>Order History</h1>
          <div>
            {
              myOrders && myOrders.map(order => {
                return (
                  <div key={order.id}>
                    <h2>Date Ordered: {order.updatedAt}</h2>
                    <h2>Status: {order.status}</h2>
                    <h2>Total: fix this </h2>
                    <Link to={`/order-detail/${order.id}`}>Order Details</Link>
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
        ordersOnProps: state.order.orders,
        userOnProps: state.user.loggedInUser.id
    }
}

const mapDispatch = (dispatch) => (
  {
    fetchOrder: () => {
      dispatch(fetchOrder());
    }
  });


export default connect(mapState, mapDispatch)(OrderHistory)
