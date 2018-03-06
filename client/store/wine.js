import axios from 'axios'
import history from '../history'
import store from './index'


const GET_WINE_LIST = 'GET_WINE_LIST'
const SELECT_WINE = 'SELECT_WINE'
const CREATE_WINE = 'CREATE_WINE'
const FILTER_WINE = 'FILTER_WINE'
const FETCH_VARIETAL = 'FETCH_VARIETAL'
const FETCH_SIZE = 'FETCH_SIZE'
const FETCH_PLACE = 'FETCH_PLACE'



const initialState = {
	wineList: [],
	selectedWine: {},
	filteredList: [],
	varietal: [],
	sizes: [],
	places: []
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })
const selectWine = wine => ({ type: SELECT_WINE, wine })
const createWine = wine => ({ type: CREATE_WINE, wine })
const fetchVarietal = varietal => ({ type: FETCH_VARIETAL, varietal })

const fetchSizes = sizes => ({ type: FETCH_SIZE, sizes })

const fetchPlace = places => ({ type: FETCH_PLACE, places })

export const filterWineList = wines => ({ type: FILTER_WINE,	wines	})

export const fetchWineList = () =>
	dispatch =>
		axios.all([
			axios.get('/api/wines'),
			axios.get('/api/wines/varietal'),
			axios.get('/api/wines/size'),
			axios.get('/api/wines/place')
		])
			.then(axios.spread((wines, varietals, size, place) => {
				dispatch(fetchSizes(size.data))
				dispatch(fetchVarietal(varietals.data))
				dispatch(fetchPlace(place.data))
				dispatch(getWineList(wines.data))
			}))

export const selectWineById = (id) =>
	dispatch =>
		axios.get(`/api/wines/${id}`)
			.then(res => {
				dispatch(selectWine(res.data))
			})
			.catch(err => console.log(err))

<<<<<<< HEAD

export const editWine = (id, editedDetails) =>
    dispatch => {
        axios.put(`/api/wines/${id}`, editedDetails)
=======
export const addWine = (wineDetails) =>
    dispatch => {
        axios.post('/api/wines', wineDetails)
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
            .then(res => {
                dispatch(createWine(res.data))
                history.push('/')
            })
            .catch(err => console.error(err))
<<<<<<< HEAD
    }


export const addWine = (wineDetails) =>
    dispatch => {
        axios.post('/api/wines', wineDetails)
            .then(res => {
                dispatch(createWine(res.data))
                history.push('/')
            })
            .catch(err => console.error(err))
=======
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
    }


const reducer = function (state = initialState, action) {
<<<<<<< HEAD
    switch (action.type) {
        case GET_WINE_LIST:
            return Object.assign({}, state, { wineList: action.wineList })
        case SELECT_WINE:
            return Object.assign({}, state, { selectedWine: action.wine })
        case CREATE_WINE:
            return Object.assign({}, state, { wineList: [...state.wineList, action.wine] })
        default: return state
    }
=======
	switch (action.type) {
		case GET_WINE_LIST:
			return Object.assign({}, state, {
				wineList: action.wineList,
				filteredList: action.wineList,
				testFilter: action.wineList
			})
		case SELECT_WINE:
			return Object.assign({}, state, { selectedWine: action.wine })
    case CREATE_WINE:
          return Object.assign({}, state, { wineList: [...state.wineList, action.wine] })
		case FILTER_WINE:
			return Object.assign({}, state, { filteredList: action.wines })
		case FETCH_VARIETAL:
			return Object.assign({}, state, { varietal: action.varietal })
		case FETCH_SIZE:
			return Object.assign({}, state, { sizes: action.sizes })
		case FETCH_PLACE:
			return Object.assign({}, state, { places: action.places })
		default: return state
	}
>>>>>>> f09788aa7f823d4ca30c81df50cfb500bbb0a3f9
};


export default reducer
