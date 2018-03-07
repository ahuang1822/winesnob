import React from 'react'
import { connect } from 'react-redux'
import { selectWineById } from '../store'
import { Link } from 'react-router-dom'

import {
  fetchWineList,
  filterWineList,
  filterVarietal,
  filterPlace,
  filterSize,
  setSearchKey,
} from '../store'


class WineList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.onClickVarietal = this.onClickVarietal.bind(this)
    this.onClickSize = this.onClickSize.bind(this)
    this.onClickPlace = this.onClickPlace.bind(this)
    this.onClickSort = this.onClickSort.bind(this)
  }

  componentDidMount() {
    this.props.fetchWineList()
    this.filteredList = this.props.wineListOnProps
  }

  handleChange(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filterList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        (wine.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          (wine.tags.join("")).toLowerCase().includes(event.target.value.toLowerCase())))
    })
    let filteredList = filterList.slice()
    let sortBy = this.props.sortByOnProps
    if (sortBy === "low-high") {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(a.price) - parseFloat(b.price)
      })
    } else {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(b.price) - parseFloat(a.price)
      })
    }
    this.props.setSearchKey(event.target.value, filteredList)
  }

  onClickVarietal(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filterList = wineList.filter(wine => {
      return (wine.varietal.includes(event.target.value) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase()))
    })
    let filteredList = filterList.slice()
    let sortBy = this.props.sortByOnProps
    if (sortBy === "low-high") {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(a.price) - parseFloat(b.price)
      })
    } else {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(b.price) - parseFloat(a.price)
      })
    }
    this.props.filterVarietal(event.target.value, filteredList)
  }

  onClickSize(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filterList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(event.target.value) &&
        wine.place.city.includes(this.props.filterPlaceOnProps) &&
        (wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase())))

    })
    let filteredList = filterList.slice()
    let sortBy = this.props.sortByOnProps
    if (sortBy === "low-high") {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(a.price) - parseFloat(b.price)
      })
    } else {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(b.price) - parseFloat(a.price)
      })
    }
    this.props.filterSize(event.target.value, filteredList)
  }

  onClickPlace(event) {
    event.preventDefault();
    let wineList = this.props.wineListOnProps
    let filterList = wineList.filter(wine => {
      return (wine.varietal.includes(this.props.filterVarietalOnProps) &&
        wine.size.includes(this.props.filterSizeOnProps) &&
        wine.place.city.includes(event.target.value) &&
        wine.name.toLowerCase().includes(this.props.searchKeyOnProps.toLowerCase()))
    })
    let filteredList = filterList.slice()
    let sortBy = this.props.sortByOnProps
    if (sortBy === "low-high") {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(a.price) - parseFloat(b.price)
      })
    } else {
      var sortedList = filteredList.sort(function (a, b) {
        return parseInt(b.price) - parseFloat(a.price)
      })
    }
    this.props.filterPlace(event.target.value, filteredList)
  }

  onClickSort(event) {
    event.preventDefault();
    let wineList = this.props.filteredListOnProps.slice()
    if (event.target.value === "low-high") {
      var sortedList = wineList.sort(function (a, b) {
        return parseInt(a.price) - parseFloat(b.price)
      })
    } else {
      var sortedList = wineList.sort(function (a, b) {
        return parseInt(b.price) - parseFloat(a.price)
      })
    }
    this.props.filterWineList(event.target.value, sortedList)
  }

  render() {
    let listOfVarietal = this.props.varietalsOnProps
    let listOfSize = this.props.sizesOnProps
    let listOfPlace = this.props.placeOnProps
    let user = this.props.user

    return (
      <div>
        <div id="wine-filters">
          <div className="filter">
            <input
              type="text"
              placeholder="Search by name/tags"
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
                  )
                }
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
                  )
                }
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
                  )
                }
                )}
              </select>
            </div>
            : <div></div>
          }

          <div className="filter">
            <select id="sort" className="filter-item" onChange={this.onClickSort}>
              <option
                key="defaultSort"
                value="default">
                Sort By
      </option>
              <option
                key="low-high-sort"
                value="low-high">
                Price: Low to High
      </option>
              <option
                key="high-low-sort"
                value="high-low">
                Price: High to Low
      </option>
            </select>
          </div>
        </div>

        {(user.isAdmin && this.props.filteredListOnProps.length) ?
          <div>
            <Link to={'/winelist/add-wine'}>Add Wine</Link>
            <div id="wine-list">
              {this.props.filteredListOnProps.map(wine => {
                if (wine.quantity) {
                  return (
                    <div className="wine-list-items">
                      <Link to={`/winelist/${wine.id}`} key={wine.id} className="wine-list-items">
                        <img src={wine.img} />
                      </Link>
                      <div className="wine-list-items">
                        <div className="wine-list-items">
                          <h3>{wine.name}</h3>
                        </div>
                        <div className="wine-list-items">
                          <h5>
                            {`${wine.vintage} ${wine.varietal}`}
                          </h5>
                        </div>
                        <div className="wine-list-items">
                          <h5>
                            {`${wine.place.city}, ${wine.place.state} ${wine.place.country}`}
                          </h5>
                        </div>
                        <div className="wine-list-items">
                          <h6>
                            size: {wine.size}
                          </h6>
                        </div>
                        <div className="wine-list-items">
                          <h6>
                            price: ${wine.price}
                          </h6>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="wine-list-items">
                      <Link to={`/winelist/${wine.id}`} key={wine.id} className="wine-list-items">
                          <img src={wine.img} />
                      </Link>
                      <div className="wine-list-items">
                        <h3>{wine.name}</h3>
                      </div>
                      <div className="wine-list-items">
                        <h5>
                          {`${wine.vintage} ${wine.varietal}`}
                        </h5>
                      </div>
                      <div className="wine-list-items">
                        <h5>
                          {`${wine.place.city}, ${wine.place.state} ${wine.place.country}`}
                        </h5>
                      </div>
                      <div className="wine-list-items">
                      <h4>Sold Out</h4>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
          :
          <ul id="wine-list">
            {this.props.filteredListOnProps.map(wine => {
              if (wine.quantity) {
                return (
                  <div className="wine-list-items">
                    <Link to={`/winelist/${wine.id}`} key={wine.id}>
                      <img src={wine.img} />
                    </Link>
                    <div>
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
                )
              } else {
                return (
                  <div className="wine-list-items">
                    <Link to={`/winelist/${wine.id}`} key={wine.id}>
                      <img src={wine.img} />
                    </Link>
                    <div>
                      <h3>{wine.name}</h3>
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
                      <h4>Sold Out</h4>
                    </div>
                  </div>
                )
              }
            })}
          </ul>
        }
      </div>
    )
  }
}

const mapState = (state) => {

  return {
    wineListOnProps: state.wine.wineList,
    filteredListOnProps: state.wine.filteredList,
    varietalsOnProps: state.wine.varietal,
    sizesOnProps: state.wine.sizes,
    placeOnProps: state.wine.places,
    filterVarietalOnProps: state.wine.setVarietal,
    filterPlaceOnProps: state.wine.setPlace,
    filterSizeOnProps: state.wine.setSize,
    searchKeyOnProps: state.wine.searchKey,
    sortByOnProps: state.wine.sortBy,
    user: state.user.loggedInUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchWineList() {
      dispatch(fetchWineList())
    },
    filterWineList(sort, wines) {
      dispatch(filterWineList(sort, wines))
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
    setSearchKey(searchKey, filteredList) {
      dispatch(setSearchKey(searchKey, filteredList))
    }
  }
}

export default connect(mapState, mapDispatch)(WineList)

