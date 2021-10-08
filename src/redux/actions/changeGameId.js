import * as actions from "../../constants/actions"

export const changeGameId = gameId => ({
    type: actions.GAME_CHANGED,
    payload: gameId

})