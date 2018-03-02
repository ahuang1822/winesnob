import axios from 'axios'
import history from '../history'

const ADD_REVIEW = 'ADD_REVIEW'

const addReview = review => ({ type: ADD_REVIEW, review })


const initialState = {
    currentReview: {}
}


export const postReview = (review) =>
  dispatch => {
    console.log('review: ', { review })
    axios.post('/api/reviews', review)
    .then(res => {
      dispatch(addReview(res.data))
      history.push('/home')
    })
      .catch(err => console.log(err))
  }


export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ADD_REVIEW:
    return Object.assign({}, state, {currentReview: action.review});
    
    default:
      return state;
  }
}