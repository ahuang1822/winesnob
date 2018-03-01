import axios from 'axios'
import history from '../history'

const initialState = {
    items: []
}



// const GET_ITEMS= 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
// const REMOVE_ITEM= 'REMOVE_ITEM'



// const getItems = items => ({ type: GET_ITEMS, items })
const addItem = item => ({ type: ADD_ITEM, item })
// const removeItem = item => ({ type: REMOVE_ITEM, item })




// export const fetchItems = () =>
//   dispatch =>
//   axios.get('/api')
//   .then(res => 
//     dispatch(getItems(res.data))
// )

export const postItem = (item) =>
    dispatch =>
        // console.log('postItem item ==============', item);
        axios.post('/api/list/cart', item)
        .then(cart => {
        console.log('PostItem res --------------->', cart);
        // dispatch(addItem(res.data))
    })
    .catch(console.error)


const reducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return Object.assign({}, state, { items: [...state.items, action.item] })
        default:
            return state;
    }
}

export default reducer