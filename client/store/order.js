import axios from 'axios'
import history from '../history'
import { clearItems } from './cart'


const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_GUEST_ORDERS = 'GET_GUEST_ORDERS'
const ADD_ORDER_TO_ORDERS = 'ADD_ORDER_TO_ORDERS'
const REMOVE_ORDER = 'REMOVE_ORDER'


const initialState = {
  orders: [],
  order: {},
}


const getOrders = orders => ({ type: GET_ORDERS, orders })
const getSingleOrder = order => ({ type: GET_SINGLE_ORDER, order })
const editOrder = order => ({ type: UPDATE_ORDER, order })
const getGuestOrders = orders => ({ type: GET_GUEST_ORDERS, orders })
const addOrderToOrders = order => ({ type: ADD_ORDER_TO_ORDERS, order })
const removeOrder = () => ({ type: REMOVE_ORDER })


export const fetchOrder = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        dispatch(getOrders(res.data))
      })
      .catch(err => console.error(err))


export const updateOrder = (id, orderInfo) =>
  dispatch =>
    axios.put(`api/orders/${id}`, orderInfo)
      .then(res => {
        dispatch(addOrderToOrders(res.data))
        dispatch(removeOrder())
        dispatch(clearItems())
        history.push('/purchase/complete')
      })
      .catch(err => console.error(err))


export const fetchSingleOrder = (id) =>
  dispatch =>
    axios.get(`/api/orders/${id}`)
      .then(res => {
        dispatch(getSingleOrder(res.data))
      })
      .catch(err => console.error(err))


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });
    case GET_SINGLE_ORDER:
      return Object.assign({}, state, { order: action.order });
    case UPDATE_ORDER:
      return Object.assign({}, state, { order: action.order })
<<<<<<< HEAD
    case ADD_ORDER_TO_ORDERS:
      return Object.assign({}, state, { orders: [...state.orders, action.order] })
    case REMOVE_ORDER:
      return Object.assign({}, state, { order: {} })
=======
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
    default:
      return state;
  }
}
