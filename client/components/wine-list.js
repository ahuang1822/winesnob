import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  selectWineById, 
  filterWineList, 
  fetchWineList, 
  fetchWineVarietal, 
  filterSizes, 
  filterVarietals, 
  filterSearch } from '../store/wine'



class WineList extends Component {
  // const wineList = props.wineListOnProps;
	// console.log(wineList)
	constructor(props) {
		super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onClickVarietal = this.onClickVarietal.bind(this)
    // this.onClickSize = this.onClickSize.bind(this)
	}

  componentDidMount() {
    this.props.fetchWineList()
  }

  handleChange (e) {
    // console.log(this.state.name)
    var filteredWines = this.props.filteredListOnProps.filter(wine => {
      return wine.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    console.log('filteredList: ', filteredWines)
    console.log("list: ", this.props.wineListOnProps)
    this.props.testFilter(filteredWines)
    // this.props.wineListOnProps = filteredWines
  }

  onClickVarietal (e) {
    // console.log("eeeee: ", e.target.value)
    // var filteredWines = this.props.wineListOnProps.filter(wine => {
    //   // return wine.varietal === e.target.value
    //   return wine.varietal.toLowerCase().includes(e.target.value.toLowerCase())
    // })
    // this.props.filterWineList(filteredWines)
    // this.props.testFilter(filteredWines)
    console.log(e.target.value)
    console.log("SIZEEEEEEEE", this.props.sizeOnProps)
    this.props.filterVarietals(e.target.value)
    // console.log('made it here')
    let varietal = this.props.varietalOnProps
    let size = this.props.sizeOnProps
    console.log([varietal, size])
    //this.props.filterSearch(e.target.value, this.props.sizeOnProps)
  }

  // onClickSize (e) {
  //   console.log("SIZEEE: ", e.target.value)
  //   var filteredWines = this.props.filter(wine => {
  //     // return wine.varietal === e.target.value
  //     return wine.varietal.toLowerCase().includes(e.target.value.toLowerCase())
  //   })
  //   this.props.filterWineList(filteredWines)
  //   this.props.testFilter(filteredWines)
  // }


	render() {
  // console.log(this.props.wineListOnProps)  
  let filteredWines = this.props.filteredListOnProps
  console.log('props: ', this.props)
  console.log('filterd: ', filteredWines)
  let listOfVarietal = this.props.varietalsOnProps
  let testFilter = this.props.testFilterOnProps
  let listOfSize = this.props.sizesOnProps
  
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
            value="default">
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
      </div> : <h2>Loading...</h2>
  }

  {listOfSize.length > 1 ?
    <div>
    <select id="size" onChange={this.onClickSize}>
        <option 
          key="defaultSize"
          value="default">
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
    </div> : <h2>Loading...</h2>
}
    
  {filteredWines.length ?
  
			<ul>
				{filteredWines.map(wine => (
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
      : <h2>Loading...</h2>
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
    sizeOnProps: state.wine.filterSize,
    varietalOnProps: state.wine.filterVarietal
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
        filterVarietals(varietal) {
          dispatch(filterVarietals(varietal))
        },
        filterSizes(size) {
          dispatch(filterSizes(size))
        },
        filterSearch(varietal, size) {
          dispatch(filterSearch(varietal, size))
        }
    }
}


export default connect(mapState, mapDispatch)(WineList)
