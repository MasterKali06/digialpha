import * as actions from "../../constants/actions"

export const changeGameId = gameId => ({
    type: actions.GAME_CHANGED,
    payload: gameId

})

export const changeMatchId = matchId => ({
    type: actions.MATCH_CHANGED,
    payload: matchId
})

export const changePageId = pageId => ({
    type: actions.PAGE_CHANGED,
    payload: pageId

})

export const changeSerieId = serieId => ({
    type: actions.SERIE_CHANGED,
    payload: serieId
})