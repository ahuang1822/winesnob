import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  selectWineById, 
  filterWineList, 
  fetchWineList, 
  fetchWineVarietal,
    } from '../store/wine'



class WineList extends Component {
  // const wineList = props.wineListOnProps;
	// console.log(wineList)
	constructor(props) {
    super(props);
    
    this.state = {
      varietal: "",
      size: "",
      place: "",
      searchKey: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.onClickVarietal = this.onClickVarietal.bind(this)
    this.onClickSize = this.onClickSize.bind(this)
    this.onClickPlace = this.onClickPlace.bind(this)
  }
  
  

  componentDidMount() {
    this.props.fetchWineList()
    this.state.filteredList = this.props.wineListOnProps
  }

  handleChange (e) {
    this.state.searchKey = e.target.value
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.state.varietal) &&
        wine.size.includes(this.state.size) &&
        wine.place.city.includes(this.state.place) &&
        wine.name.toLowerCase().includes(e.target.value.toLowerCase()))
    })
    this.props.filterWineList(filteredList)
  }

  onClickVarietal (e) {
    this.state.varietal = e.target.value
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.state.varietal) &&
        wine.size.includes(this.state.size) &&
        wine.place.city.includes(this.state.place) &&
        wine.name.toLowerCase().includes(this.state.searchKey.toLowerCase()))
    })
    this.props.filterWineList(filteredList)
  }

  onClickSize (e) {
    this.state.size = e.target.value
    // console.log("this.state.varietal: ", this.state)
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.state.varietal) &&
        wine.size.includes(this.state.size) &&
        wine.place.city.includes(this.state.place) &&
        wine.name.toLowerCase().includes(this.state.searchKey.toLowerCase()))
    })
    this.props.filterWineList(filteredList)
  }

  onClickPlace (e) {
    this.state.place = e.target.value
    let wineList = this.props.wineListOnProps
    let filteredList = wineList.filter(wine => {
      return (wine.varietal.includes(this.state.varietal) &&
        wine.size.includes(this.state.size) &&
        wine.place.city.includes(this.state.place) &&
        wine.name.toLowerCase().includes(this.state.searchKey.toLowerCase()))
    })
    this.props.filterWineList(filteredList)
  }

	render() {
  // let filteredWines = this.props.filteredListOnProps
  let listOfVarietal = this.props.varietalsOnProps
  let listOfSize = this.props.sizesOnProps
  let listOfPlace = this.props.placeOnProps

	return (
		<div>
		<div id="filterByName">
			<input
				type="text"
				placeholder="Wine Name"
				onChange={this.handleChange}
				/>
    </div>

    {listOfVarietal.length > 1 ?
      <div>
      <select id="varietal" onChange={this.onClickVarietal}>
          <option 
            key="defaultVarietal"
            value="">
              Search By Varietal
            </option>
        {listOfVarietal.map(varietal => (
          <option 
            key={varietal.id} 
            value={varietal.varietal}>
              {varietal.varietal}
            </option>
        ))}
        </select>
      </div> : <div></div>
  }

  {listOfSize.length > 1 ?
    <div>
    <select id="size" onChange={this.onClickSize}>
        <option 
          key="defaultSize"
          value="">
            Search By Size
          </option>
      {listOfSize.map(size => (
        <option 
          key={size.id} 
          value={size.size}>
            {size.size}
          </option>
      ))}
      </select>
    </div> : <div></div>
}
    
  {listOfPlace.length > 1 ?
    <div>
    <select id="place" onChange={this.onClickPlace}>
        <option 
          key="defaultSize"
          value="">
            Search By Vineyard Location
          </option>
      {listOfPlace.map(place => (
        <option 
          key={place.id} 
          value={place.city}>
            {place.city}
          </option>
      ))}
      </select>
    </div> : <div></div>
  }

  {this.props.filteredListOnProps.length ?
  
			<ul>
				{this.props.filteredListOnProps.map(wine => (
					<Link to={`/winelist/${wine.id}`} key={wine.id}>
						<div>
							<img src={wine.img} />
						</div>
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
					</Link>
				))}
      </ul>
      : <h2>Can't find that</h2>
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
    placeOnProps: state.wine.places
  }
}

const mapDispatch = (dispatch) => {
    return {
        fetchWineList () {
          dispatch(fetchWineList())
        },
        filterWineList(wines) {
          dispatch(filterWineList(wines)) 
        }
    }
}


export default connect(mapState, mapDispatch)(WineList)
