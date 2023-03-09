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
            const productInCart = state.cartProduct.find(
                p => +p.id === action.payload.id
            )
            if (!productInCart) {
                return {
                    ...state,
                    cartProduct: [...state.cartProduct, action.payload]
                }
            } else {
                let newCart = state.cartProduct
                const indexProduct = newCart.findIndex(item => +item.id === action.payload.id)
                if (newCart[indexProduct].quantity === undefined) {
                    newCart[indexProduct].quantity = 1;
                } else {
                    newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1
                }
                return {
                    ...state,
                    cartProduct: [...newCart]
                }
            }



        default: return state;
    }
};

export default productReducer;