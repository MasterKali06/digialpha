import * as actions from "../../constants/actions"

const initialState = {
    loading: false,
    matches: [],
    error: ""
}

export const ongoingMatchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ONGOING_MATCHES:
            return {
                ...state,
                loading: true
            }

        case actions.GET_ONGOING_MATCHES_SUCCES:
            return {
                loading: false,
                matches: action.payload,
                error: ""
            }

        case action.GET_ONGOING_MATCHES_FAIL:
            return {
                loading: false,
                matches: [],
                error: action.payload
            }

        default:
            return state;
    }
}


export const upcomingMatchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_UPCOMING_MATCHES:
            return {
                ...state,
                loading: true
            }
        case actions.GET_UPCOMING_MATCHES_SUCCES:
            return {
                loading: false,
                matches: action.payload,
                error: ""
            }

        case actions.GET_UPCOMING_MATCHES_FAIL:
            return {
                loading: false,
                matches: [],
                error: action.payload
            }

        default:
            return state;
    }
}

export const pastMatchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PAST_MATCHES:
            return {
                ...state,
                loading: true
            };

        case actions.GET_PAST_MATCHES_SUCCES:
            return {
                loading: false,
                matches: action.payload,
                error: ""
            }

        case actions.GET_PAST_MATCHES_FAIL:
            return {
                loading: false,
                matches: [],
                error: action.payload
            }

        default:
            return state;
    }
}
