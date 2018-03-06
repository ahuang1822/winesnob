import React from 'react'
import { connect } from 'react-redux'
import { selectWineById, editWine } from '../store/wine'


export const EditWine = (props) => {
    const wine = props.data;
    const user = props.user;
    let { name, description, img, vintage, varietal, size, price } = wine;
    return (
        <div>
            {
                user.isAdmin
                    ? (
                        <div>
                            <h3>{name}</h3>
                            <form onSubmit={(event) => props.handleSubmit(event, wine.id)}>
                                <fieldset>
                                    <legend>Edit Wine</legend>
                                    <div>
                                        <label>Name</label>
                                        <input name="name" type="text" defaultValue={name} />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <input name="description" type="text" defaultValue={description} />
                                    </div>
                                    <div>
                                        <label>Image</label>
                                        <input name="image" type="text" defaultValue={img} />
                                    </div>
                                    <div>
                                        <label>Vintage</label>
                                        <input name="vintage" type="number" defaultValue={vintage} />
                                    </div>
                                    <div>
                                        <label>Varietal</label>
                                        <input name="varietal" type="text" defaultValue={varietal} />
                                    </div>
                                    <div>
                                        <label>Size</label>
                                        <input name="size" type="text" defaultValue={size} />
                                    </div>
                                    <div>
                                        <label>Price</label>
                                        <input name="price" type="text" defaultValue={price} />
                                    </div>
                                    <button type="submit" >Submit Changes</button>
                                </fieldset>
                            </form>
                        </div>
                    )
                    : <h3>404 Error</h3>
            }

        </div>
    )
}


class Loader extends React.Component {
    componentDidMount() {
        console.log('props***', this.props)
        this.props.load(this.props.match.params.id)
            .then(console.log)
            .catch(console.error)
    }
    render() {
        console.log('test **********')
        if (!this.props.data) return <h1>Loading...</h1>
        const Render = this.props.Render
        return <Render user={this.props.user} data={this.props.data} handleSubmit={this.props.handleSubmit} />
    }
}


const mapState = (state) => {
    return {
        data: state.wine.selectedWine.wine,
        user: state.user.loggedInUser,
        Render: EditWine
    }
}


const mapDispatch = (dispatch) => {
    return {
        load(id) {
            return dispatch(selectWineById(id))
        },
        handleSubmit(event, id) {
            event.preventDefault();
            let editedValues = {
                name: event.target.name.value,
                vintage: event.target.vintage.value,
                varietal: event.target.varietal.value,
                price: event.target.price.value,
                size: event.target.size.value,
                img: event.target.image.value,
                description: event.target.description.value
            }
            dispatch(editWine(id, editedValues))
        }
    }
}


export default connect(mapState, mapDispatch)(Loader)

