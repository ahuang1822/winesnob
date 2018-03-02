import React from 'react'
import { connect } from 'react-redux'
import { SelectedWine } from './selected-wine'
import { selectWineById } from '../store/wine'
import { postReview } from '../store'


class Review extends React.Component {

  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const wineId = Number(this.props.match.params.wineId)
    this.props.selectWineById(wineId);
  }

  onSubmit(event) {
    event.preventDefault()
    const reviewInfo = {
      comment: event.target.review.value,
      rating: event.target.rating.value,
      userId: this.props.currentUser.id,
      wineId: this.props.selectedWine.id
    }
    this.props.addReview(reviewInfo)
  }


  render() {
    const wine = this.props.selectedWine;
    if (!this.props.selectedWine) {
      if (this.props.currentUser.id === null) {
        return <h1>You do not have permission to write a review</h1>
      } else {
        return <h1>Loading...</h1>
      }
    }
    else {
      return (
        <div>
          <SelectedWine selectedWine={wine} />
          <h1>Review this bottle!</h1>
          <form onSubmit={this.onSubmit}>
            <div>
                <input 
                name="review" 
                width="200" 
                height="200"/>
            </div>
            <div> 
              Rating (1 - 5)
              <div>
              <input 
              name="rating" 
              width="200" 
              height="200"/>
              </div>
            </div>
            <button type="submit">Submit Revew</button> 
          </form>
        </div>
      )
    }
  }
}

const mapState = (state) => {
  console.log('state.user: ', state.user)
    return {
        selectedWine: state.wine.selectedWine.wine,
        currentUser: state.user.loggedInUser
    }
}

const mapDispatch = (dispatch) => {
  return {
    selectWineById: (id) => {
      dispatch(selectWineById(id))
    },
    addReview: (reviewInfo) => {
      console.log(reviewInfo)
      dispatch(postReview(reviewInfo))
    }
  }
}

export default connect(mapState, mapDispatch)(Review)
