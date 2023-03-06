import { useEffect } from "react";
import { FETCH_ALL_PRODUCTS } from "../actions/productActions";


const INITIAL_STATE = {
    product: []
};



const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_ALL_PRODUCTS:

            return {
                ...state,
                product: action.payload
            };

        default: return state;

    }

};

export default productReducer;