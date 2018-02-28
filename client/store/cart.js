import axios from 'axios'
import history from '../history'





const initialState = {
    items: []
}



const GET_ITEMS= 'GET_ITEMS'
const ADD_ITEM= 'GET_ITEM'




const getItems = items => ({ type: GET_ITEMS, items })
const addItem = item => ({ type: ADD_ITEM, item })
