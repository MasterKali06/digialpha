import * as actions from "../../constants/actions"

export const changePageId = pageId => ({
    type: actions.PAGE_CHANGED,
    payload: pageId

})