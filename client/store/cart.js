import axios from 'axios'
import history from '../history'

const initialState = {
    items: [],
    userItems: []
}



// const GET_ITEMS= 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
// const REMOVE_ITEM= 'REMOVE_ITEM'
const GET_ITEMS_BY_ORDER = 'GET_ITEMS_BY_ORDER'

// const getItems = items => ({ type: GET_ITEMS, items })
const addItem = item => ({ type: ADD_ITEM, item })
const getItemsByOrder = items => ({ type: GET_ITEMS_BY_ORDER, items })
// const removeItem = item => ({ type: REMOVE_ITEM, item })
// function addItem(item) {
//     const action = { type: ADD_ITEM, item }
//     return action
// }





// export const fetchItems = () =>
//   dispatch =>
//   axios.get('/api')
//   .then(res => 
//     dispatch(getItems(res.data))
// )

export const postItem = (postWine) =>
    dispatch =>
        // console.log('postItem item ==============', item);
        axios.post('/api/list/cart', postWine)
        .then(res => {
        console.log('PostItem res --------------->', res);
        dispatch(addItem(res.data))
    })
    .catch(console.error)

export const getItems = () => 
    dispatch =>
        axios.get('/api/')

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            console.log('action.item =======', action)
            return Object.assign({}, state, { items: state.items.concat(action.item) })
        default:
            return state;
    }
}

export default reducer