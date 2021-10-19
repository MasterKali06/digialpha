import * as actions from "../../constants/actions"

export const changeMatchId = matchId => ({
    type: actions.MATCH_CHANGED,
    payload: matchId
})