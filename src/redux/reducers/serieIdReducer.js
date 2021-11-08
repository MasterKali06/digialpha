import * as actions from "../../constants/actions"

const serieIdReducer = (state = null, action) => {
    switch (action.type) {
        case actions.SERIE_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export default serieIdReducer;