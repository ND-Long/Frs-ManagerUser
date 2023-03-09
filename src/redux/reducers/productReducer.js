import { useEffect } from "react";
import { ADD_TO_CART, FETCH_ALL_PRODUCTS } from "../actions/productActions";


const INITIAL_STATE = {
    product: [],
    cartProduct: []
};



const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return {
                ...state,
                product: action.payload
            };

        case ADD_TO_CART:
            console.log(">>>check redux", action.payload)
            return {
                ...state,
                cartProduct: [...state.cartProduct, action.payload]
            }
        default: return state;
    }
};

export default productReducer;