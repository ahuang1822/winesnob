import axios from 'axios'
import history from '../history'
import { fetchSingleOrder } from './order'


const initialState = {
    items: [],
    userItems: []
}


const GET_ITEMS = 'GET_ITEMS'
//const ADD_ITEM = 'ADD_ITEM'
const CLEAR_ITEMS = 'CLEAR_ITEMS'

<<<<<<< HEAD
const GET_ITEMS= 'GET_ITEMS'
//const ADD_ITEM = 'ADD_ITEM'
// const REMOVE_ITEM= 'REMOVE_ITEM'
const CLEAR_ITEMS = 'CLEAR_ITEMS'
=======
>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7

const getItems = items => ({ type: GET_ITEMS, items })
//const addItem = item => ({ type: ADD_ITEM, item })
export const clearItems = () => ({ type: CLEAR_ITEMS })

<<<<<<< HEAD
const getItems = items => ({ type: GET_ITEMS, items })
//const addItem = item => ({ type: ADD_ITEM, item })
// const removeItem = item => ({ type: REMOVE_ITEM, item })
export const clearItems = () => ({ type: CLEAR_ITEMS})
=======
export const fetchItems = () =>
    dispatch =>
        axios.get('/api/list/cart')
            .then(res => {
                dispatch(getItems(res.data))
            })
            .catch(err => console.error(err))

>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7


export const postItem = (postWine) =>
    dispatch =>
        axios.post('/api/list/cart', item)
            .then(list => {
                dispatch(fetchSingleOrder(list.data.orderId))
            })
            .catch(err => console.error(err))

<<<<<<< HEAD
export const fetchItems = () =>
  dispatch =>
    axios.get('/api/list/cart')
  .then(res => { 
    console.log('RES IN FETCH', res)
    dispatch(getItems(res.data))
  })
.catch(console.error)
=======

>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7

export const putItems = (body) =>
    dispatch =>
<<<<<<< HEAD
        // console.log('postItem item ==============', item);
        axios.post('/api/list/cart', item)
        .then(cart => {
        console.log('IN HERE', cart);
          //dispatch(addItem(res.data))
    })
    .catch(console.error)

=======
        axios.put('/api/list/guestCart', body)
            .catch(err => console.error(err))


export const updateQuantity = (id, quantity) =>
    dispatch =>
        axios.put(`/api/list/cart/${id}`, quantity)
            .catch(err => console.error(err))



export const removeItem = (id) =>
   dispatch =>
     axios.delete(`/api/list/cart/${id}`)
     .catch(err => console.error(err))

>>>>>>> c0bf6040c224bfc281d95180776fa314ac9a2bb7
const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return Object.assign({}, state, { items: action.items })
        case CLEAR_ITEMS:
            return Object.assign({}, state, { items: [] })
        default:
            return state;
    }
}

export default reducer