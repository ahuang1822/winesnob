import axios from 'axios'
import history from '../history'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const initialState = {
  loggedInUser: {},
}


const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })


export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data)))
      .catch(err => console.log(err))


// export const login = () => dispatch => {

// }

// export const signup = () => dispatch => {

// }


// export const edit = () => dispatch => {

// }


// export const auth = (email, password, method) =>
//   dispatch =>
//     axios.post(`/auth/${method}`, { email, password })
//       .then(res => {
//         dispatch(getUser(res.data))
//         history.push('/home')
//       }, authError => { // rare example: a good use case for parallel (non-catch) error handler
//         dispatch(getUser({ error: authError }))
//       })
//       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, { loggedInUser: action.user });
    case REMOVE_USER:
      return Object.assign({}, state, { loggedInUser: {} });
    default:
      return state;
  }
}
