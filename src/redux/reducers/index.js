import { combineReducers } from "redux";
import matchIdReducer from "./matchIdReducer";
import gameIdReducer from "./gameIdReducer"
import { ongoingMatchesReducer, pastMatchesReducer, upcomingMatchesReducer } from "./getMatchesReducer";
import getTeamsReducer from "./getTeamsReducer"
import { ongoingSeriesReducer, pastSeriesReducer, upcomingSeriesReducer } from "./getSeriesReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pageIdReducer from "./pageIdReducer";
import serieIdReducer from "./serieIdReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['gameId', 'pastSeries', 'ongoingSeries', 'upcomingSeries']
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
    pastSeries: pastSeriesReducer
})

export default persistReducer(persistConfig, reducers);
