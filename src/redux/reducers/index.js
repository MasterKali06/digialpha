import { combineReducers } from "redux";
import matchIdReducer from "./matchIdReducer";
import gameIdReducer from "./gameIdReducer"
import { ongoingMatchesReducer, pastMatchesReducer, upcomingMatchesReducer } from "./getMatchesReducer";
import getTeamsReducer from "./getTeamsReducer"

const reducers = combineReducers({
    gameId: gameIdReducer,
    matchId: matchIdReducer,
    teams: getTeamsReducer,
    upcomingMatches: upcomingMatchesReducer,
    ongoingMatches: ongoingMatchesReducer,
    pastMatches: pastMatchesReducer
})

export default reducers;
