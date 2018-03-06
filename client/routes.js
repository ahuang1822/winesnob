import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import {Home, Login, WineList, AccountPage, Cart, Checkout, AddWine, EditWine, OrderDetails, OrderHistory, Review, SelectedWine, EditPayment, CreatePayment, CreateUserPlace, EditUserPlace, Signup, CompletedPurchase} from './components'
import { fetchWineList, fetchItems, me } from './store'

=======
import {Home,
        Login,
        WineList,
        AccountPage,
        Cart,
        Checkout,
        AddWine,
        EditWine,
        OrderDetails,
        OrderHistory,
        Review,
        SelectedWine,
        Payment,
        UserPlace,
        Signup}
        from './components'
import {me} from './store'
import { fetchWineList } from './store/wine'
import { fetchItems } from './store/cart'
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    this.props.loadWineList()
    this.props.loadCart()
  }
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/winelist" component={WineList} />
        <Route exact path="/winelist/add-wine" component={AddWine} />
        <Route exact path="/winelist/:id" component={SelectedWine} />
        <Route exact path="/winelist/:id/edit" component={EditWine} />
        <Route exact path="/account-page" component={AccountPage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/order-detail/:orderId" component={OrderDetails} />
        <Route exact path="/order-history" component={OrderHistory} />
        <Route exact path="/reviews/:wineId" component={Review} />
        <Route exact path="/payment/:id" component={CreatePayment} />
        <Route exact path="/payment/:id/:paymentId" component={EditPayment} />
        <Route exact path="/shipping/:id" component={CreateUserPlace} />
        <Route exact path="/shipping/:id/:placeId" component={EditUserPlace} />
        <Route exact path="/purchase/complete" component={CompletedPurchase} />
      </Switch>
    )
  }
}


const mapState = () => ({message: 'Welcome'})


const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadWineList () {
      dispatch(fetchWineList())
    },
    loadCart () {
      dispatch(fetchItems())
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Routes))


Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
}
