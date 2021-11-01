import { combineReducers } from "redux";
import matchIdReducer from "./matchIdReducer";
import gameIdReducer from "./gameIdReducer"
import { ongoingMatchesReducer, pastMatchesReducer, upcomingMatchesReducer } from "./getMatchesReducer";
import getTeamsReducer from "./getTeamsReducer"
import { ongoingSeriesReducer, pastSeriesReducer, upcomingSeriesReducer } from "./getSeriesReducer";

const reducers = combineReducers({
    gameId: gameIdReducer,
    matchId: matchIdReducer,
    teams: getTeamsReducer,
    upcomingMatches: upcomingMatchesReducer,
    ongoingMatches: ongoingMatchesReducer,
    pastMatches: pastMatchesReducer,
    upcomingSeries: upcomingSeriesReducer,
    ongoingSeries: ongoingSeriesReducer,
    pastSeries: pastSeriesReducer
})

export default reducers;
