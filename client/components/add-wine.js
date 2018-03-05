import React from 'react'
import { connect } from 'react-redux'
import { addWine } from '../store/wine'

export const AddWine = (props) => {
    console.log('test AddWine')
    const user = props.user
    return (
        <div>
            {
                user.isAdmin
                    ? (
                        <div>
                            <h3>{name}</h3>
                            <form onSubmit={(event) => props.handleSubmit(event)}>
                                <fieldset>
                                    <legend>Edit Wine</legend>
                                    <div>
                                        <label>Name</label>
                                        <input name="name" type="text" />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <input name="description" type="text" />
                                    </div>
                                    <div>
                                        <label>Image</label>
                                        <input name="image" type="text" />
                                    </div>
                                    <div>
                                        <label>Vintage</label>
                                        <input name="vintage" type="number" />
                                    </div>
                                    <div>
                                        <label>Varietal</label>
                                        <input name="varietal" type="text" />
                                    </div>
                                    <div>
                                        <label>Place</label>
                                        <input name="city" type="text" defaultValue={'City'} />
                                        <input name="state" type="text" defaultValue={'State'} />
                                        <input name="country" type="text" defaultValue={'Country'} />
                                    </div>
                                    <div>
                                        <label>Size</label>
                                        <input name="size" type="text" />
                                    </div>
                                    <div>
                                        <label>Price</label>
                                        <input name="price" type="text" />
                                    </div>
                                    <div>
                                        <label>Quantity</label>
                                        <input name="quantity" type="number" />
                                    </div>
                                    <button type="submit" >Add Wine</button>
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

    render() {
        const Render = this.props.Render
        return <Render handleSubmit={this.props.handleSubmit} user={this.props.user} />
    }
}

const mapState = (state) => {
    console.log('state user: ', state.user);

    return {
        user: state.user.loggedInUser,
        Render: AddWine
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            let newWine = {
                name: event.target.name.value,
                vintage: event.target.vintage.value,
                varietal: event.target.varietal.value,
                price: event.target.price.value,
                size: event.target.size.value,
                img: event.target.image.value,
                description: event.target.description.value,
                quantity: event.target.quantity.value,
                city: event.target.city.value,
                state: event.target.state.value,
                country: event.target.country.value
            }
            dispatch(addWine(newWine))
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)
