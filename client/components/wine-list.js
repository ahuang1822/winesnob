import React, { Component } from 'react';
import { connect } from 'react-redux'

import { selectWineById, filterWineList, fetchWineList } from '../store/wine'
import { Link } from 'react-router-dom'


class WineList extends Component {
  // const wineList = props.wineListOnProps;
	// console.log(wineList)
	constructor(props) {
		super(props)
    this.handleChange = this.handleChange.bind(this)
	}

  componentDidMount() {
    this.props.fetchWineList()  
  }

  handleChange (e) {
    // console.log(this.state.name)
    var filteredWines = this.props.wineListOnProps.filter(wine => {
      return wine.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    console.log('filteredList: ', filteredWines)
    console.log("list: ", this.props.wineListOnProps)
    this.props.filterWineList(filteredWines)
    // this.props.wineListOnProps = filteredWines
  }

	render() {
  // console.log(this.props.wineListOnProps)  
  let filteredWines = this.props.filteredListOnProps
  console.log('props: ', this.props)
  console.log('filterd: ', filteredWines)
  
	return (
		<div>
		<div id="filterByName">
			<input
				type="text"
				placeholder="Wine Name"
				onChange={this.handleChange}
				/>
    </div>
      <div id="filter-varietal" className="dropdown">
        <button className="dropbtn">Filter By Varietal</button>
        <div id="myDropdown" className="dropdown-content">
          <a href="#">Pinot</a>
          <a href="#">Cabernet</a>
          <a href="#">Chardonnay</a>
        </div>
      </div>
  {filteredWines.length ?
  
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
      : <h2>cant find that shit try again</h2>
      }
		</div>
  )}
}



const mapState = (state) => { 
    return {
        wineListOnProps: state.wine.wineList,
        filteredListOnProps: state.wine.filteredList
    }
    
}

const mapDispatch = (dispatch) => {
    return {
        // selectWine(id) {
        //     dispatch(selectWineById(id))
        // },
        fetchWineList () {
          dispatch(fetchWineList())
        },
        filterWineList(wines) {
          dispatch(filterWineList(wines))
      }
    }
}


export default connect(mapState, mapDispatch)(WineList)
