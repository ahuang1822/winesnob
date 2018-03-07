import axios from 'axios'
import history from '../history'
import { clearItems } from './cart'
import { updateOrder } from './order'
import { clickedTrue } from './wine'



const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_GUEST_PAYMENT = 'ADD_GUEST_PAYMENT'
const CLEAR_GUEST_ADDRESS = 'CLEAR_GUEST_ADDRESS'
const CLEAR_GUEST_PAYMENT = 'CLEAR_GUEST_PAYMENT'
const ADD_GUEST_ADDRESS = 'ADD_GUEST_ADDRESS'


const initialState = {
  loggedInUser: {},
  guestPayment: {},
  guestAddress: {}
}


const getUser = user => ({ type: GET_USER, user })
const addUser = user => ({ type: ADD_USER, user })
const editUser = user => ({ type: UPDATE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const addGuestPayment = payment => ({ type: ADD_GUEST_PAYMENT, payment })
export const clearGuestAddress = () => ({ type: CLEAR_GUEST_ADDRESS })
export const clearGuestPayment = () => ({ type: CLEAR_GUEST_PAYMENT })
const addGuestAddress = address => ({ type: ADD_GUEST_ADDRESS, address })


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
        dispatch(clearGuestAddress())
        dispatch(clearGuestPayment())
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
      .catch(err => console.error(err))


export const updateUserPlace = (placeId, userId, editInfo) =>
  dispatch =>
    axios.put(`/api/users/place/${userId}/${placeId}`, editInfo)
      .then(res => {
        dispatch(editUser(res.data))
        history.push(`/checkout`)
      })
      .catch(err => console.error(err))


export const addPayment = (paymentInfo, userId) =>
  dispatch =>
    axios.post(`/api/users/payment/${userId}`, paymentInfo)
      .then(res => {
        dispatch(editUser(res.data))
        history.push('/checkout')
      })
      .catch(err => console.error(err))


export const updatePayment = (paymentInfo, userId, paymentId) =>
  dispatch =>
    axios.put(`/api/users/payment/${userId}/${paymentId}`, paymentInfo)
      .then(res => {
        dispatch(editUser(res.data))
        history.push('/checkout')
      })
      .catch(err => console.error(err))

export const addAdmin = (newAdmin) =>
  dispatch => {
    return axios.put('/api/users/add_admin', newAdmin)
      .then(res => { history.push(`/`) })
      .catch(err => console.error(err))
  }

export const editPassword = (editedUserPass) =>
  dispatch => {
    return axios.put('/api/users/change_password', editedUserPass)
      .then(res => { history.push('/account-page') })
      .catch(err => console.error(err))
  }

export const deleteUser = (user) =>
  dispatch => {
    return axios.put('/api/users/delete_user', user)
      .then(res => { history.push('/account-page') })
      .catch(err => console.error(err))
  }
export const updateGuestAddress = address =>
  dispatch => {
    dispatch(addGuestAddress(address))
    history.push('/checkout')
  }


export const updateGuestPayment = address =>
  dispatch => {
    dispatch(addGuestPayment(address))
    history.push('/checkout')
  }


export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() => {
        dispatch(removeUser())
        dispatch(clearItems())
        dispatch(clickedTrue())
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
    case ADD_GUEST_PAYMENT:
      return Object.assign({}, state, { guestPayment: action.payment });
    case ADD_GUEST_ADDRESS:
      return Object.assign({}, state, { guestAddress: action.address })
    case CLEAR_GUEST_ADDRESS:
      return Object.assign({}, state, { guestAddress: {} })
    case CLEAR_GUEST_PAYMENT:
      return Object.assign({}, state, { guestPayment: {} })
    default:
      return state;
  }
}
