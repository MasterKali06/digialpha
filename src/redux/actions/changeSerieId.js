import * as actions from "../../constants/actions"

export const changeSerieId = serieId => ({
    type: actions.SERIE_CHANGED,
    payload: serieId
})