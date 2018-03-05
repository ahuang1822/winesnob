import React from 'react'
import { connect } from 'react-redux'
import { removeCategory} from '../store/wine'

export const EditWineDetails = (props) => {
    const user = props.user;
    let wineCategories = props.wineCategories;
    console.log('wineCategories: ', wineCategories);
    
    return (
        <div>
            {
                user.isAdmin
                    ? (
                        <div>
                            <div>
                                <form onSubmit={(event) => props.handleSubmit(event)}>
                                    <fieldset>
                                        <legend>Remove Categories</legend>
                                        <div>
                                            <input type="checkbox" id="removeName" name="name" value="Name" onClick={props.handleClick}/>
                                            <label for="removeName">Name</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removeDescription" name="description" value="Description" onClick={props.handleClick}/>
                                            <label for="removeDescription">Description</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removeImage" name="image" value="Image" onClick={props.handleClick}/>
                                            <label for="removeImage">Image</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removeVintage" name="vintage" value="Vintage" onClick={props.handleClick}/>
                                            <label for="removeVintage">Name</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removeVarietal" name="varietal" value="Varietal" onClick={props.handleClick}/>
                                            <label for="removeVarietal">Name</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removeSize" name="size" value="Size" onClick={props.handleClick}/>
                                            <label for="removeSize">Size</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="removePrice" name="price" value="Price"onClick={props.handleClick} />
                                            <label for="removePrice">Price</label>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div>
                                <form>
                                    <fieldset>
                                        <legend>Add Categories</legend>
                                        <div>
                                            <label>Category</label>
                                            <input name="addCategory" type="text" />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <button type="submit" >Submit Changes</button>
                        </div>

                    )
                    : <h3>404 Error</h3>
            }
        </div>
    )
}

class Loader extends React.Component {

    componentDidMount() {

    }

    render() {
        const Render = this.props.Render
        return <Render user={this.props.user} 
                       handleSubmit={this.props.handleSubmit} 
                       handleClick={this.props.handleClick} 
                       wineCategories={this.props.wineCategories}
                />
    }
}

const mapState = (state) => {
    console.log(state.user)
    return {
        user: state.user.loggedInUser,
        wineCategories: state.wine.wineCategories,
        Render: EditWineDetails
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleClick(event) {
            return dispatch(removeCategory(event.target.name))
        },
        handleSubmit(event) {
            // event.preventDefault();
            // let editedValues = {
            //     name: event.target.name.value,
            //     vintage: event.target.vintage.value,
            //     varietal: event.target.varietal.value,
            //     price: event.target.price.value,
            //     size: event.target.size.value,
            //     img: event.target.image.value,
            //     description: event.target.description.value

            // }
            // dispatch(editWine(id, editedValues))
        }
    }
}

export default connect(mapState, mapDispatch)(Loader)