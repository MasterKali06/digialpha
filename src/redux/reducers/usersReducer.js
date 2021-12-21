import * as actions from "../../constants/actions"


const userReducer = (state = [], action) => {
    switch (action.type) {
        case actions.GET_USERS:
            return action.payload

        default:
            return state
    }
}

const adminReducer = (state = null, action) => {
    switch (action.type) {
        case actions.SAVE_ADMIN:
            return action.payload

        default:
            return state
    }
}

export { userReducer, adminReducer };