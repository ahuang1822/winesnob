import axios from 'axios'
import history from '../history'

const initialState = {
    items: []
}



 const GET_ITEMS= 'GET_ITEMS'
//const ADD_ITEM = 'ADD_ITEM'
// const REMOVE_ITEM= 'REMOVE_ITEM'
const CLEAR_ITEMS = 'CLEAR_ITEMS'


 const getItems = items => ({ type: GET_ITEMS, items })
//const addItem = item => ({ type: ADD_ITEM, item })
// const removeItem = item => ({ type: REMOVE_ITEM, item })
export const clearItems = () => ({ type: CLEAR_ITEMS})



export const fetchItems = () =>
  dispatch =>
  axios.get('/api/list/cart')
  .then(res => { 
    console.log('RES IN FETCH', res)
    dispatch(getItems(res.data))
  })
.catch(console.error)



export const postItem = (item) =>
    dispatch =>
        // console.log('postItem item ==============', item);
        axios.post('/api/list/cart', item)
        .then(cart => {
        console.log('IN HERE');
          //dispatch(addItem(res.data))
    })
    .catch(console.error)




const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return Object.assign({}, state, { items: state.items.concat(action.items) })
        case CLEAR_ITEMS:
            return Object.assign({}, state, { items: [] })
        default:
            return state;
    }
}

export default reducer