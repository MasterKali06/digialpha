import * as actions from "../../constants/actions"

const initialState = {
    loading: false,
    series: [],
    error: ""
}

export const ongoingSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ONGOING_SERIES:
            return {
                ...state,
                loading: true
            }

        case actions.GET_ONGOING_SERIES_SUCCESS:
            return {
                loading: false,
                series: action.payload,
                error: ""
            }

        case actions.GET_ONGOING_SERIES_FAIL:
            return {
                loading: false,
                series: [],
                error: action.payload
            }

        default:
            return state;
    }
}


export const upcomingSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_UPCOMING_SERIES:
            return {
                ...state,
                loading: true
            }
        case actions.GET_UPCOMING_SERIES_SUCCESS:
            return {
                loading: false,
                series: action.payload,
                error: ""
            }

        case actions.GET_UPCOMING_SERIES_FAIL:
            return {
                loading: false,
                series: [],
                error: action.payload
            }

        default:
            return state;
    }
}

export const pastSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PAST_SERIES:
            return {
                ...state,
                loading: true
            };

        case actions.GET_PAST_SERIES_SUCCESS:
            return {
                loading: false,
                series: action.payload,
                error: ""
            }

        case actions.GET_PAST_SERIES_FAIL:
            return {
                loading: false,
                series: [],
                error: action.payload
            }

        default:
            return state;
    }
}
