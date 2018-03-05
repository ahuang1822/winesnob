import React from 'react'
import { connect } from 'react-redux'
import { SelectedWine } from './selected-wine'
import { selectWineById } from '../store'

class Review extends React.Component {

  componentDidMount() {
    const wineId = Number(this.props.match.params.wineId)
    this.props.selectWineById(wineId);
  }

  render() {
    const wine = this.props.selectedWine;
    console.log('wine: ', wine);
    if (!this.props.selectedWine) {
      return <h1>Loading...</h1>
    }
    else {
      return (
        <div>
          <SelectedWine selectedWine={wine} />
          <h1>Review</h1>
          <p> Text to write stuff </p>
        </div>
      )
    }
  }
}

const mapState = (state) => {

    return {
        selectedWine: state.wine.selectedWine.wine
    }
}

const mapDispatch = (dispatch) => {
  return {
    selectWineById: (id) => {
      dispatch(selectWineById(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Review)
