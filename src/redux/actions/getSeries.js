import * as actions from "../../constants/actions"
import axios from "axios"

const getOngoingSeries = () => ({
    type: actions.GET_ONGOING_SERIES
})

const getOngoingSeriesSuccess = matches => ({
    type: actions.GET_ONGOING_SERIES_SUCCESS,
    payload: matches
})

const getOngoingSeriesFail = error => ({
    type: actions.GET_ONGOING_SERIES_FAIL,
    payload: error
})

const getUpcomingSeries = () => ({
    type: actions.GET_UPCOMING_SERIES,
})

const getUpcomingSeriesSuccess = matches => ({
    type: actions.GET_UPCOMING_SERIES_SUCCESS,
    payload: matches
})

const getUpcomingSeriesFail = error => ({
    type: actions.GET_UPCOMING_SERIES_FAIL,
    payload: error
})



const getPastSeries = matches => ({
    type: actions.GET_PAST_SERIES,
    payload: matches

})

const getPastSeriesSuccess = matches => ({
    type: actions.GET_PAST_SERIES_SUCCESS,
    payload: matches
})

const getPastSeriesFail = error => ({
    type: actions.GET_PAST_SERIES_FAIL,
    payload: error
})

export const getSeries = (gameId, serieMode, source, year = null) => (dispatch) => {

    let func = {}
    switch (serieMode) {
        case "running":
            func = { loading: getOngoingSeries, success: getOngoingSeriesSuccess, fail: getOngoingSeriesFail }
            break;
        case "upcoming":
            func = { loading: getUpcomingSeries, success: getUpcomingSeriesSuccess, fail: getUpcomingSeriesFail }
            break;
        default:
            func = { loading: getPastSeries, success: getPastSeriesSuccess, fail: getPastSeriesFail }
            break;
    }


    dispatch(func.loading())
    axios.get(
        `http://localhost:5000/series?game=${gameId}&year=${year}&serieMode=${serieMode}`,
        { cancelToken: source.token }
    )
        .then(
            response => {

                dispatch(func.success(response.data))

            })
        .catch(err => dispatch(func.fail(err.message)))

}