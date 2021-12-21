import * as actions from "../../constants/actions"


const productReducer = (state = [], action) => {
    switch (action.type) {
        case actions.GET_PRODUCTS:
            return action.payload

        default:
            return state
    }
}


export { productReducer };