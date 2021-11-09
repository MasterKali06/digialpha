import * as actions from "../../constants/actions"

export const runningTourStateReducer = (state = false, action) => {
    switch (action.type) {
        case actions.RUNNING_TOUR_DISPATCHED:
            return action.payload;

        default:
            return state;
    }
}

export const upcomingTourStateReducer = (state = false, action) => {
    switch (action.type) {
        case actions.UPCOMING_TOUR_DISPATCHED:
            return action.payload;

        default:
            return state;
    }
}

export const pastTourStateReducer = (state = false, action) => {
    switch (action.type) {
        case actions.PAST_TOUR_DISPATCHED:
            return action.payload;

        default:
            return state;
    }
}