import * as actions from "../../constants/actions"

const matchIdReducer = (state = null, action) => {
    switch (action.type) {
        case actions.MATCH_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export default matchIdReducer;