import axios from 'axios'
import history from '../history'


const GET_WINE_LIST = 'GET_WINE_LIST'
const SELECT_WINE = 'SELECT_WINE'
const CREATE_WINE = 'CREATE_WINE'

const initialState = {
    wineList: [],
    selectedWine: {},
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })
const selectWine = wine => ({ type: SELECT_WINE, wine })
const createWine = wine => ({ type: CREATE_WINE, wine })


export const fetchWineList = () =>
    dispatch =>
        axios.get('/api/wines')
            .then(res =>
                dispatch(getWineList(res.data)))
            .catch(err => console.error(err))


export const selectWineById = (id) =>
    dispatch =>
        axios.get(`/api/wines/${id}`)
            .then(res => {
                dispatch(selectWine(res.data))
            })
            .catch(err => console.error(err))

export const editWine = (id, editedDetails) =>
    dispatch => {
        console.log(editedDetails);
        axios.put(`/api/wines/${id}`, editedDetails)
            .then(res => {
                history.push(`/winelist/${id}`)
            })
            .catch(err => console.error(err))

    }

export const addWine = (wineDetails) =>
    dispatch => {
        axios.post('/api/wines', wineDetails)
        .then(res => {
            dispatch(createWine(res.data))
            history.push('/')
        })
        .catch(err => console.error(err))
    }

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_WINE_LIST:
            return Object.assign({}, state, { wineList: action.wineList })
        case SELECT_WINE:
            return Object.assign({}, state, { selectedWine: action.wine })
        case CREATE_WINE:
            return Object.assign({}, state, { wineList: [...state.wineList, action.wine]})
      
        default: return state
    }
};


export default reducer
