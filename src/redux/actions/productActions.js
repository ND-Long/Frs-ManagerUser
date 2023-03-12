import { useDispatch } from "react-redux"
import { getAllProducts } from "../../components/services/apiServices"

export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS"
export const ADD_TO_CART = "ADD_TO_CART"
export const INCREASE_CART = "INCREASE_CART"
export const DECREASE_CART = "DECREASE_CART"
export const DELETE_CART = "DELETE_CART"
export const DELETE_ALL_CART = "DELETE_ALL_CART"
export const BUY_ONE = 'BUY_ONE'

export const deleteCart = (data) => {
    return {
        type: DELETE_CART,
        payload: data
    }
}

export const increaseCart = (data) => {
    return {
        type: INCREASE_CART,
        payload: data
    }
}


export const decreaseCart = (data) => {
    return {
        type: DECREASE_CART,
        payload: data
    }
}


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

export const deleteAllCart = () => {
    return {
        type: DELETE_ALL_CART
    }
}


