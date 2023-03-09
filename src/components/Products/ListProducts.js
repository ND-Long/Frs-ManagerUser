import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FETCH_ALL_PRODUCTS } from "../../redux/actions/productActions";
import { getAllProducts } from "../../components/services/apiServices";
import { useSelector } from 'react-redux';

import "./Product.scss"
import ProductCard from './ProductCard';

const ListProducts = (props) => {
    const dataAllUsers = useSelector(state => state.product.product)
    return (
        <div className='listProduct-content mx-3' >
            {
                dataAllUsers.map((product) => {
                    return (
                        <ProductCard
                            product={product}
                        />
                    )
                })
            }
        </div >
    );
}

export default ListProducts;