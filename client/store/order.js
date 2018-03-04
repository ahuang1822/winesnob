import axios from 'axios'


const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_GUEST_ORDERS = 'GET_GUEST_ORDERS'

const initialState = {
  orders: [],
  order: {},
  guestOrders: []
}


const getOrders = orders => ({ type: GET_ORDERS, orders })
const getSingleOrder = order => ({ type: GET_SINGLE_ORDER, order })
const editOrder = order => ({ type: UPDATE_ORDER, order })
const getGuestOrders = orders => ({ type: GET_GUEST_ORDERS, orders })

export const fetchOrder = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        //console.log('res data info: ', res.data);
        dispatch(getOrders(res.data))
      })
      .catch(err => console.log(err))


export const updateOrder = (id, orderInfo) => 
  dispatch =>
    axios.put(`api/orders/${id}`, orderInfo)
      .then(res => {
        console.log('res.data', res.data)
        dispatch(editOrder(res.data))
      })
      .catch(err => console.log(err))
      

export const fetchSingleOrder = (id) =>
  dispatch =>
    axios.get(`/api/orders/${id}`)
      .then(res => {
        dispatch(getSingleOrder(res.data))
      })
      .catch(err => console.log(err))

export const fetchGuestOrders = () => 
dispatch =>
axios.get('api/orders/guest')
.then(res => {
  dispatch(getGuestOrders(res.data))
})
.catch(err => console.log(err))



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });
    case GET_SINGLE_ORDER:
      return Object.assign({}, state, { order: action.order });
    case UPDATE_ORDER:
     return Object.assign({}, state, { order: action.order })
     case GET_GUEST_ORDERS:
     return Object.assign({}, state, { guestOrders: action.orders })
    default:
      return state;
  }
}
