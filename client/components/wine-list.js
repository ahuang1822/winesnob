import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  filterWineList, 
  fetchWineList,
  filterVarietal,
  filterPlace,
  filterSize,
  setSearchKey,
      } from '../store'


class WineList extends Component {
	constructor(props) {
    super(props);

    // this.state = {
    //   varietal: '',
    //   size: '',
    //   place: '',
    //   searchKey: ''
    // }

    this.handleChange = this.handleChange.bind(this)
    this.onClickVarietal = this.onClickVarietal.bind(this)
    this.onClickSize = this.onClickSize.bind(this)
    this.onClickPlace = this.onClickPlace.bind(this)
  }


  componentDidMount() {
    this.props.fetchWineList()
    this.filteredList = this.props.wineListOnProps
  }

  handleChange (event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        wine.name.toLowerCase().includes(event.target.value.toLowerCase()))
    })
    this.props.filterWineList(filteredList)
  }

  onClickVarietal(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(event.target.value) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase()))
    })
    this.props.filterVarietal(event.target.value, filteredList)
  }

  onClickSize(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(event.target.value) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase()))
    })
    this.props.filterSize(event.target.value, filteredList)
  }

  onClickPlace(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(event.target.value) &&
        wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase()))
    })
    this.props.filterPlace(event.target.value, filteredList)
  }

	render() {
  let listOfVarietal = this.props.varietalsOnProps
  let listOfSize = this.props.sizesOnProps
  let listOfPlace = this.props.placeOnProps

	return (
    <div>
		<div id="wine-filters">
      <div className="filter">
        <input
          type="text"
          placeholder="Wine Name"
          className="filter-item"
          onChange={this.handleChange}
          />
      </div>

      {listOfVarietal.length > 1 ?
        <div className="filter">
        <select id="varietal" className="filter-item" onChange={this.onClickVarietal}>
            <option
              key="defaultVarietal"
              value="">
                Search By Varietal
              </option>
          {listOfVarietal.map(varietal => {
            return (
            <option
              key={varietal.id}
              value={varietal.varietal}>
                {varietal.varietal}
              </option>
            )}
          )}
          </select>
        </div> : <div />
      }

      {listOfSize.length > 1 ?
        <div className="filter">
        <select id="size" className="filter-item" onChange={this.onClickSize}>
            <option
              key="defaultSize"
              value="">
                Search By Size
              </option>
          {listOfSize.map(size => {
            return (
            <option
              key={size.id}
              value={size.size}>
                {size.size}
              </option>
            )}
          )}
          </select>
        </div> : <div />
    }

    {listOfPlace.length > 1 ?
      <div className="filter">
      <select id="place" className="filter-item" onChange={this.onClickPlace}>
          <option
            key="defaultSize"
            value="">
              Search By Vineyard Location
            </option>
        {listOfPlace.map(place => {
          return (
          <option
            key={place.id}
            value={place.city}>
              {place.city}
            </option>
          )}
        )}
        </select>
      </div>
       : <div />

    }
    </div>

  {this.props.filteredListOnProps.length ?
			<ul id="wine-list">
          {this.props.filteredListOnProps.map(wine => {
            return (
            <div>
            <Link to={`/winelist/${wine.id}`} key={wine.id}>
              <img src={wine.img} />
            </Link>
            <div className="wine-list-items">              
              <div><h3>{wine.name}</h3></div>
              <div>
                <h5>
                  {`${wine.vintage} ${wine.varietal}`}
                </h5>
              </div>
              <div>
                <h5>
                  {`${wine.place.city}, ${wine.place.state} ${wine.place.country}`}
                </h5>
              </div>
              <div>
                <h6>
                  size: {wine.size}
                </h6>
              </div>
              <div>
                <h6>
                  price: ${wine.price}
                </h6>
              </div>
            </div>
          </div>
          )}
        )}
      </ul>
      : <h2>Unavailable</h2>
      }
    </div>
  )}
}


const mapState = (state) => {
  return {
    wineListOnProps: state.wine.wineList,
    filteredListOnProps: state.wine.filteredList,
    varietalsOnProps: state.wine.varietal,
    sizesOnProps: state.wine.sizes,
    placeOnProps: state.wine.places,
    filterVarietalOnProps: state.wine.filterVarietal,
    filterPlaceOnProps: state.wine.filterPlace,
    filterSizeOnProps: state.wine.filterSize,
    searchKeyOnProps: state.wine.searchKey,
  }
}

const mapDispatch = (dispatch) => {
    return {
        fetchWineList () {
          dispatch(fetchWineList())
        },
        filterWineList(wines) {
          dispatch(filterWineList(wines))
        },
        filterVarietal(varietal, filteredList) {
          dispatch(filterVarietal(varietal, filteredList))
        },
        filterPlace(place, filteredList) {
          dispatch(filterPlace(place, filteredList))
        },
        filterSize(size, filteredList) {
          dispatch(filterSize(size, filteredList))
        },
        setSearchKey(searchKey) {
          dispatch(setSearchKey(searchKey, filteredList))
        }
    }
}


export default connect(mapState, mapDispatch)(WineList)
