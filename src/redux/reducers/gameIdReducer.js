import * as actions from "../../constants/actions"

const gameIdReducer = (state = 0, action) => {
    switch (action.type) {
        case actions.GAME_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export default gameIdReducer;