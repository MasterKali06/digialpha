import axios from "axios"
import * as actions from "../../constants/actions"
import { PRODUCTS_API } from "../../constants/constants"


export const getProducts = products => ({
    type: actions.GET_PRODUCTS,
    payload: products
})


export const getProductsFromApi = (page, token) => (dispatch) => {

    console.log("dispatching products")

    axios.get(`${PRODUCTS_API}?page=${page}`, { cancelToken: token.token })
        .then(response => {
            dispatch(getProducts(response.data.data))
            console.log("data", response.data.data)
        })
        .catch(err => console.log(err))
}


