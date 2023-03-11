import { useEffect } from "react";
import { ADD_TO_CART, FETCH_ALL_PRODUCTS, DECREASE_CART, INCREASE_CART, DELETE_CART, DELETE_ALL_CART } from "../actions/productActions";


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

        case INCREASE_CART:
            let newCart = state.cartProduct
            const indexProduct = newCart.findIndex(item => +item.id === action.payload.id)

            newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1
            return {
                ...state,
                cartProduct: [...newCart]
            }

        case DECREASE_CART:
            let newCart2 = state.cartProduct
            const indexProduct2 = newCart2.findIndex(item => +item.id === action.payload.id)
            if (newCart2[indexProduct2].quantity === 1) {
                newCart2[indexProduct2].quantity = 1
            } else {
                newCart2[indexProduct2].quantity = newCart2[indexProduct2].quantity - 1
            }
            return {
                ...state,
                cartProduct: [...newCart2]
            }

        case DELETE_CART:
            let cloneDelete = state.cartProduct
            const arrDelete = cloneDelete.filter(item => +item.id !== action.payload.id)

            return {
                ...state,
                cartProduct: [...arrDelete]
            }

        case ADD_TO_CART:
            const productInCart = state.cartProduct.find(
                p => +p.id === action.payload.id
            )
            if (!productInCart) {
                const newProduct = action.payload
                newProduct.quantity = 1
                return {
                    ...state,
                    cartProduct: [...state.cartProduct, newProduct]
                }
            } else {
                let newCart = state.cartProduct
                const indexProduct = newCart.findIndex(item => +item.id === action.payload.id)
                if (newCart[indexProduct].quantity == undefined) {
                    newCart[indexProduct].quantity = 1;
                } else {
                    newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1
                }
                return {
                    ...state,
                    cartProduct: [...newCart]
                }
            }

        case DELETE_ALL_CART:
            return {
                ...state,
                cartProduct: []
            }



        default: return state;
    }
};

export default productReducer;