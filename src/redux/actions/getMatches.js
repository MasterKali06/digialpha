import * as actions from "../../constants/actions"
import axios from "axios"

const getOngoingMatches = () => ({
    type: actions.GET_ONGOING_MATCHES
})

const getOngoingMatchesSuccess = matches => ({
    type: actions.GET_ONGOING_MATCHES_SUCCES,
    payload: matches
})

const getOngoingMatchesFail = error => ({
    type: actions.GET_ONGOING_MATCHES_FAIL,
    payload: error
})

const getUpcomingMatches = () => ({
    type: actions.GET_UPCOMING_MATCHES,
})

const getUpcomingMatchesSuccess = matches => ({
    type: actions.GET_UPCOMING_MATCHES_SUCCES,
    payload: matches
})

const getUpcomingMatchesFail = error => ({
    type: actions.GET_UPCOMING_MATCHES_FAIL,
    payload: error
})



const getPastMatches = matches => ({
    type: actions.GET_PAST_MATCHES,
    payload: matches

})

const getPastMatchesSuccess = matches => ({
    type: actions.GET_PAST_MATCHES_SUCCES,
    payload: matches
})

const getPastMatchesFail = error => ({
    type: actions.GET_PAST_MATCHES_FAIL,
    payload: error
})

export const getMatches = (gameId, matchMode, range = null) => (dispatch) => {

    let func = {}
    switch (matchMode) {
        case "running":
            func = { loading: getOngoingMatches, success: getOngoingMatchesSuccess, fail: getOngoingMatchesFail }
            break;
        case "upcoming":
            func = { loading: getUpcomingMatches, success: getUpcomingMatchesSuccess, fail: getUpcomingMatchesFail }
            break;
        default:
            func = { loading: getPastMatches, success: getPastMatchesSuccess, fail: getPastMatchesFail }
            break;
    }


    // return function (dispatch) {
    dispatch(func.loading())
    axios.get(`http://localhost:5000/matches?game=${gameId}&range=${range}&matchMode=${matchMode}`)
        .then(
            response => {

                dispatch(func.success(response.data))
            })
        .catch(err => dispatch(func.fail(err.message)))
}

