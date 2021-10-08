import * as actions from "../../constants/actions"

const reducer = (state = 0, action) => {
    switch (action.type) {
        case actions.GAME_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export default reducer;