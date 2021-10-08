import * as actions from "../../constants/actions"

const reducer = (state = [], action) => {
    switch (action.type) {
        case actions.GET_TEAMS:
            return action.payload;

        default:
            return state;
    }
}

export default reducer;