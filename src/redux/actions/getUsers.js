import axios from "axios"
import * as actions from "../../constants/actions"
import { USER_API } from "../../constants/constants"


const getUsers = users => ({
    type: actions.GET_USERS,
    payload: users
})


const getUsersFromApi = (page, token) => (dispatch) => {

    console.log("dispatching users")

    axios.get(`${USER_API}?page=${page}`, { cancelToken: token.token })
        .then(response => {
            dispatch(getUsers(response.data.data))
            console.log("data", response.data.data)
        })
        .catch(err => console.log(err))
}


// this should be in a seprate file but for the simplicity
const saveAdmin = admin => ({
    type: actions.SAVE_ADMIN,
    payload: admin
})






export { getUsersFromApi, saveAdmin };