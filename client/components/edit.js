import React from 'react'
import { connect } from 'react-redux'
import { selectWineById } from '../store/wine'

export const EditWine = (props) => {
    console.log('EditWine props ...........', props)
    return (
        <div>
            <h3>Test</h3>
        </div>
    )
}

class WineEditContainer extends React.Component {
    componentDidMount() {
        this.props.selectWineById(this.props.match.params.id)
    }

    render() {
        if (!this.props.EditWine) return <h1>Loading...</h1>

        return <EditWine selectedWine={this.props.selectedWine} />
    }
}

class Loader extends React.Component {
    componentDidMount() {
        console.log('test')
        this.props.load(this.props.match.params.id)
            .then(console.log)
            .catch(console.error)
    }

    render() {
        if (!this.props.data) return <h1>Loading...</h1>

        const Render = this.props.Render
        return <Render data={this.props.data} />
    }
}

const mapState = (state) => {

    return {
        data: state.wine.selectedWine.wine,
        Render: EditWine
    }
}

const mapDispatch = (dispatch) => {
    return {
        load(id) {
            return dispatch(selectWineById(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)
