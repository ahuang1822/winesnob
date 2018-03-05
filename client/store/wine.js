import axios from 'axios'
import history from '../history'
import store from './index'


const GET_WINE_LIST = 'GET_WINE_LIST'
const SELECT_WINE = 'SELECT_WINE'
const FILTER_WINE = 'FILTER_WINE'

const initialState = {
    wineList: [],
    selectedWine: {},
    filteredList: []   
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })

const selectWine = wine => ({ type: SELECT_WINE, wine })

const filterWine = wines => ({ type: FILTER_WINE, wines })


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

export const filterWineList = (wines) => {
    return {
        type: FILTER_WINE,
        wines: wines
    }
}
    
  

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_WINE_LIST:
            return Object.assign({}, state, { wineList: action.wineList, filteredList: action.wineList })
        case SELECT_WINE:
            return Object.assign({}, state, { selectedWine: action.wine })
        case FILTER_WINE:
            return Object.assign({}, state, { filteredList: action.wines  })
        default: return state
    }
};


export default reducer
