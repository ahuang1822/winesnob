import axios from 'axios'
import history from '../history'


const GET_WINE_LIST = 'GET_WINE_LIST'
const SELECT_WINE = 'SELECT_WINE'


const initialState = {
    wineList: [],
    selectedWine: {}
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })

const selectWine = wine => ({ type: SELECT_WINE, wine })


export const fetchWineList = () =>
    dispatch =>
        axios.get('/api/wines')
            .then(res =>
                dispatch(getWineList(res.data)))
            .catch(err => console.log(err))


export const selectWineById = (id) =>
    dispatch =>
        axios.get(`/api/wines/${id}`)
            .then(res => {
                dispatch(selectWine(res.data))
                history.push(`/winelist/${res.data.id}`)
            })


const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_WINE_LIST:
            return Object.assign({}, state, { wineList: action.wineList })
        case SELECT_WINE:
            return Object.assign({}, state, { selectedWine: action.wine })
        default: return state
    }
};


export default reducer
