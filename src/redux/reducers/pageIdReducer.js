import * as actions from "../../constants/actions"

const pageIdReducer = (state = 1, action) => {
    switch (action.type) {
        case actions.PAGE_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export default pageIdReducer;