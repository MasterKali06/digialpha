import { combineReducers } from "redux";
import gameIdReducer from "./gameIdReducer"
import { ongoingMatchesReducer, pastMatchesReducer, upcomingMatchesReducer } from "./getMatchesReducer";
import getTeamsReducer from "./getTeamsReducer"

const reducers = combineReducers({
    gameId: gameIdReducer,
    teams: getTeamsReducer,
    upcomingMatches: upcomingMatchesReducer,
    ongoingMatches: ongoingMatchesReducer,
    pastMatches: pastMatchesReducer
})

export default reducers;
