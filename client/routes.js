import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Home, AccountPage, Cart, Checkout, AddWine, EditWine, Login, OrderDetails, OrderHistory, Review, SelectedWine, Signup, WineList} from './components'
import {me} from './store'
import {fetchWineList} from './store/wine'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    this.props.loadWineList()
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/winelist" component={WineList} />
        <Route exact path="/winelist/:id" component={SelectedWine} />
        <Route exact path="/winelist/:id/edit" component={EditWine} />
        <Route exact path="/winelist/add-wine" component={AddWine} />
        <Route exact path="/account-page" component={AccountPage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/order-detail/:orderId" component={OrderDetails} />
        <Route exact path="/order-history" component={OrderHistory} />
        <Route exact path="/reviews/:wineId" component={Review} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = () => ({message: 'Welcome'})

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadWineList () {
      dispatch(fetchWineList())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  //isLoggedIn: PropTypes.bool.isRequired
}
