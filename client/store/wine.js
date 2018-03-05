import axios from 'axios'
import history from '../history'
import store from './index'


const GET_WINE_LIST = 'GET_WINE_LIST'
const SELECT_WINE = 'SELECT_WINE'
const FILTER_WINE = 'FILTER_WINE'
const FETCH_VARIETAL = 'FETCH_VARIETAL'
const FETCH_SIZE = 'FETCH_SIZE'
const FILTER_SIZE = 'FILTER_SIZE'
const FILTER_VARIETAL = 'FILTER_VARIETAL'

const initialState = {
	wineList: [],
	selectedWine: {},
	filteredList: [],
	varietal: [],
	sizes: [],
	filterSize: 'default',
	filterVarietal: 'default'
}


const getWineList = wineList => ({ type: GET_WINE_LIST, wineList })

const selectWine = wine => ({ type: SELECT_WINE, wine })

const fetchVarietal = varietal => ({ type: FETCH_VARIETAL, varietal })

const fetchSizes = sizes => ({ type: FETCH_SIZE, sizes })

const setVarietal = varietal => ({ type: FILTER_VARIETAL, varietal})

const setSize = size => ({ type: FILTER_SIZE, size})

// const filterSizes = size => ({ type: FILTER_SIZE, size})

// const filterVarietals = varietal => ({ type: FILTER_VARIETAL, varietal})

const filterWineList = wines => ({ type: FILTER_WINE, wines})

export const fetchWineList = () =>
	dispatch =>
		axios.all([
			axios.get('/api/wines'),
			axios.get('/api/wines/varietal'),
			axios.get('/api/wines/size')
		])
			.then(axios.spread((wines, varietals, size) => {
				dispatch(fetchSizes(size.data))
				dispatch(fetchVarietal(varietals.data))
				dispatch(getWineList(wines.data))

			}))

export const selectWineById = (id) =>
	dispatch =>
		axios.get(`/api/wines/${id}`)
			.then(res => {
				dispatch(selectWine(res.data))
			})
			.catch(err => console.log(err))

export const filterSizes = (size) => {
	dispatch(setSize(size))
}

export const filterVarietals = (varietal) => {
	dispatch(setVarietal(varietal))
}

// export const filteredList = (wines) => {
// 	return {
// 		type: FILTER_WINE,
// 		filteredList: wines
// 	}
// }

export const filterSearch = (varietal, size) => {
	console.log('HERERERERE')
	console.log("hit filter search1",varietal)
	console.log("hit filter search 2", size)
	dispatch => 
		axios.get('/api/wines/search/Chardonnay/750 ml')
			.then(res => {
				console.log('herererE????')
				dispatch(filterWineList(res.data))
			})
			.catch(err => console.log(err))
}

export const fetchWineVarietal = () =>
	dispatch =>
		axios.get('/api/wines/varietal')
			.then(res =>
				dispatch(fetchVarietal(res.data)))
			.catch(err => console.log(err))


const reducer = function (state = initialState, action) {
	switch (action.type) {
		case GET_WINE_LIST:
			return Object.assign({}, state, {
				wineList: action.wineList,
				filteredList: action.wineList,
				testFilter: action.wineList
			})
		case SELECT_WINE:
			return Object.assign({}, state, { selectedWine: action.wine })
		case FILTER_WINE:
			return Object.assign({}, state, { filteredList: action.wines })
		case FETCH_VARIETAL:
			return Object.assign({}, state, { varietal: action.varietal })
		case FETCH_SIZE:
			return Object.assign({}, state, { sizes: action.sizes })
		case FILTER_SIZE:
			return Object.assign({}, state, { filterSize: action.size })
		case FILTER_VARIETAL:
			return Object.assign({}, state, { filterVarietal: action.varietal })
		default: return state
	}
};


export default reducer
