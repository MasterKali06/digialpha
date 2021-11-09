import * as actions from "../../constants/actions"


export const changeRunningTourState = state => ({
    type: actions.RUNNING_TOUR_DISPATCHED,
    payload: state
})

export const changeUpcomingTourState = state => ({
    type: actions.UPCOMING_TOUR_DISPATCHED,
    payload: state
})

export const changePastTourState = state => ({
    type: actions.PAST_TOUR_DISPATCHED,
    payload: state
})