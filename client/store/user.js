import axios from 'axios'
import history from '../history'
import { clearItems } from './cart'
import { updateOrder } from './order'


const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'


const initialState = {
  loggedInUser: {},
}


const getUser = user => ({ type: GET_USER, user })
const addUser = user => ({ type: ADD_USER, user })
const editUser = user => ({ type: UPDATE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data)))
      .catch(err => console.error(err))


export const login = (email, password, order) =>
  dispatch =>
    axios.post('/auth/login', { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(clearItems())
        history.push('/')
      })
      .catch(err => console.error(err))


export const signup = (signUpInfo, order) =>
  dispatch =>
    axios.post('/auth/signup', signUpInfo)
      .then(res => {
        dispatch(addUser(res.data))
        if (order.id) {
          dispatch(updateOrder(order.id, { userId: res.data.id }))
        }
        history.push('/')
      })
      .catch(err => console.error(err))


export const edit = (userId, editInfo) =>
  dispatch =>
    axios.put(`/api/users/${userId}`, editInfo)
      .then(res => {
        dispatch(editUser(res.data))
        history.push(`/cart`)
      })
      .catch(err => console.error(err))


      export const editUserPlace = (placeId, editInfo) =>
      dispatch =>
        axios.put(`/api/users/place/${placeId}`, editInfo)
        .then(res => console.log(res.data) )
          .catch(err => console.error(err))




export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        dispatch(clearItems())
        history.push('/login')
      })
      .catch(err => console.error(err))


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, { loggedInUser: action.user });

    case ADD_USER:
      return Object.assign({}, state, { loggedInUser: action.user });

    case UPDATE_USER:
      return Object.assign({}, state, { loggedInUser: action.user });

    case REMOVE_USER:
      return Object.assign({}, state, { loggedInUser: {} });
    default:
      return state;
  }
}
