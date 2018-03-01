import axios from 'axios'


const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'


const initialState = {
  orders: [],
  order: {}
}


const getOrders = (orders) => ({ type: GET_ORDERS, orders })
const getSingleOrder = order => ({ type: GET_SINGLE_ORDER, order })
const addOrder = order => ({ type: ADD_ORDER, order })
const editOrder = order => ({ type: UPDATE_ORDER, order })
const removeOrder = () => ({ type: REMOVE_ORDER })


export const fetchOrder = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        console.log('res data info: ', res.data);
        dispatch(getOrders(res.data))
      })
      .catch(err => console.log(err))

export const fetchSingleOrder = (id) =>
  dispatch =>
    axios.get(`/api/orders/${id}`)
      .then(res => {
        dispatch(getSingleOrder(res.data))
      })
      .catch(err => console.log(err))


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });

    case GET_SINGLE_ORDER:
      return Object.assign({}, state, { order: action.order });

    default:
      return state;
  }
}
