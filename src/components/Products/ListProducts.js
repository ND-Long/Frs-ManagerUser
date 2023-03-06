import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { FETCH_ALL_PRODUCTS } from "../../redux/actions/productActions";
import { getAllProducts } from "../../components/services/apiServices";

import "./Product.scss"

const ListProducts = (props) => {
    const dataAllUsers = useSelector(state => state.product.product)
    const dispatch = useDispatch()
    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        fetchAllUsers()

    }, [])

    const fetchAllUsers = async () => {
        const resAllProduct = await getAllProducts()
        setListProducts(resAllProduct)
        dispatch({
            type: FETCH_ALL_PRODUCTS,
            payload: resAllProduct
        })
    }



    const navigate = useNavigate()
    const handleClickProduct = (event) => {
        console.log(event)
        navigate(`/product/${event}`)
    }
    return (
        <div className='listProduct-content mx-3' >

            {
                listProducts.map((product) => (
                    <div className="card-product h-100" >
                        <div onClick={() => handleClickProduct(product.id)}>
                            <div className='card-img-top'>
                                <img className="img-top" src={product.image1} alt="..." />
                            </div>
                            <div className="card-body mt-2 mx-1">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Tuổi: {product.age}</h5>
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
}

export default ListProducts;