import * as actions from "../../constants/actions"

export const gameIdReducer = (state = 0, action) => {
    switch (action.type) {
        case actions.GAME_CHANGED:
            return action.payload;

        default:
            return state;
    }
}


export const matchIdReducer = (state = null, action) => {
    switch (action.type) {
        case actions.MATCH_CHANGED:
            return action.payload;

        default:
            return state;
    }
}


export const pageIdReducer = (state = 1, action) => {
    switch (action.type) {
        case actions.PAGE_CHANGED:
            return action.payload;

        default:
            return state;
    }
}

export const serieIdReducer = (state = null, action) => {
    switch (action.type) {
        case actions.SERIE_CHANGED:
            return action.payload;

        default:
            return state;
    }
}
