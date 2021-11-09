import { combineReducers } from "redux";
import { ongoingMatchesReducer, pastMatchesReducer, upcomingMatchesReducer } from "./getMatchesReducer";
import getTeamsReducer from "./getTeamsReducer"
import { ongoingSeriesReducer, pastSeriesReducer, upcomingSeriesReducer } from "./getSeriesReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { gameIdReducer, pageIdReducer, serieIdReducer, matchIdReducer } from "./idReducer";
import { pastTourStateReducer, runningTourStateReducer, upcomingTourStateReducer } from "./tournamentReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['gameId', 'upcomingSerieState', 'runningSerieState', 'pastSerieState']
}

const reducers = combineReducers({
    gameId: gameIdReducer,
    matchId: matchIdReducer,
    pageId: pageIdReducer,
    serieId: serieIdReducer,
    teams: getTeamsReducer,
    upcomingMatches: upcomingMatchesReducer,
    ongoingMatches: ongoingMatchesReducer,
    pastMatches: pastMatchesReducer,
    upcomingSeries: upcomingSeriesReducer,
    ongoingSeries: ongoingSeriesReducer,
    pastSeries: pastSeriesReducer,
    upcomingSerieState: upcomingTourStateReducer,
    runningSerieState: runningTourStateReducer,
    pastSerieState: pastTourStateReducer
})

export default persistReducer(persistConfig, reducers);
