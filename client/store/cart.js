import axios from 'axios'
import history from '../history'
import { fetchSingleOrder } from './order'


const initialState = {
    items: []
}


const GET_ITEMS = 'GET_ITEMS'
//const ADD_ITEM = 'ADD_ITEM'
const CLEAR_ITEMS = 'CLEAR_ITEMS'


const getItems = items => ({ type: GET_ITEMS, items })
//const addItem = item => ({ type: ADD_ITEM, item })
export const clearItems = () => ({ type: CLEAR_ITEMS })

export const fetchItems = () =>
    dispatch =>
        axios.get('/api/list/cart')
            .then(res => {
                dispatch(getItems(res.data))
            })
            .catch(err => console.error(err))



export const postItem = (item) =>
    dispatch =>
        axios.post('/api/list/cart', item)
            .then(list => {
                dispatch(fetchSingleOrder(list.data.orderId))
            })
            .catch(err => console.error(err))



export const putItems = (body) =>
    dispatch =>
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