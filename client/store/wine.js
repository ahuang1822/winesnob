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
const SET_VARIETAL = 'SET_VARIETAL'
const SET_PLACE = 'SET_PLACE'
const SET_SIZE = 'SET_SIZE'
const SEARCH_KEY = 'SEARCH_KEY'
const SORT_BY ='SORT_BY'



const initialState = {
	wineList: [],
	selectedWine: {},
	filteredList: [],
	varietal: [],
	sizes: [],
	places: [],
	setVarietal: "",
	setPlace: "",
	setSize: "",
	searchKey: "",
	sortBy: "default"
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })
const selectWine = wine => ({ type: SELECT_WINE, wine })
const createWine = wine => ({ type: CREATE_WINE, wine })
const fetchVarietal = varietal => ({ type: FETCH_VARIETAL, varietal })
const fetchSizes = sizes => ({ type: FETCH_SIZE, sizes })
const fetchPlace = places => ({ type: FETCH_PLACE, places })



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


export const filterVarietal = (varietal, wines) =>
	dispatch => {
		dispatch({ type: SET_VARIETAL, varietal })
		dispatch({ type: FILTER_WINE, wines })
	}

export const filterSize = (size, wines) =>
	dispatch => {
		dispatch({ type: SET_SIZE, size })
		dispatch({ type: FILTER_WINE, wines })
	}

export const filterPlace = (place, wines) =>
	dispatch => {
		dispatch({ type: SET_PLACE, place })
		dispatch({ type: FILTER_WINE, wines })
	}

export const setSearchKey = (searchKey, wines) =>
	dispatch => {
		dispatch({ type: SEARCH_KEY, searchKey })
		dispatch({ type: FILTER_WINE, wines })
	}

export const filterWineList = (sortBy, wines) => 
	dispatch => { 
		dispatch({ type: SORT_BY, sortBy})
		dispatch({ type: FILTER_WINE, wines })
	}
	
export const selectWineById = (id) =>
	dispatch =>
		axios.get(`/api/wines/${id}`)
			.then(res => {
				dispatch(selectWine(res.data))
			})
			.catch(err => console.error(err))

            
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
			return Object.assign({}, state, {
				wineList: action.wineList,
				filteredList: action.wineList
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
		case SET_VARIETAL:
			return Object.assign({}, state, { setVarietal: action.varietal })
		case SET_PLACE:
			return Object.assign({}, state, { setPlace: action.place })
		case SET_SIZE:
			return Object.assign({}, state, { setSize: action.size })
		case SEARCH_KEY:
			return Object.assign({}, state, { searchKey: action.searchKey })
		case SORT_BY:
			return Object.assign({}, state, { sortBy: action.sortBy })
		default: return state
	}
};


export default reducer
