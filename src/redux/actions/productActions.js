import { useDispatch } from "react-redux"
import { getAllProducts } from "../../components/services/apiServices"

export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS"
export const ADD_TO_CART = "ADD_TO_CART"

export const fetchAllUsersRedux = () => {
    return async (dispatch, payload) => {
        const res = await getAllProducts()
        dispatch(allUsersRedux(res))
    }

}

export const addToCartRedux = (data) => {

    return ({
        type: ADD_TO_CART,
        payload: data
    })
}


export const allUsersRedux = (data) => {
    return ({
        type: FETCH_ALL_PRODUCTS,
        payload: data
    })
}


