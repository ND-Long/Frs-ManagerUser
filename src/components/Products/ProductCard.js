import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartRedux } from '../../redux/actions/productActions';


function ProductCard(props) {
    useEffect(() => {

    }, [])

    const dispatch = useDispatch()


    const navigate = useNavigate()

    const handleClickProduct = (event) => {
        navigate(`/product/${event}`)
    }
    const { product } = props
    var number = +product.price;
    var numberOld = +product.price * 1.25;
    const result = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
    const resultOld = numberOld.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"

    const handleCheckout = async () => {
        dispatch(addToCartRedux(product))
        navigate(`/checkout/${product.id}`)
    };
    return (
        <div className="card-product" >

            <div className="image-container" >

                <div className="first">

                    <div className="d-flex justify-content-between align-items-center">

                        <span className="discount" onClick={() => handleClickProduct(product.id)}>-25%</span>
                        {/* <span className="wishlist"><i className="fa fa-heart-o"></i></span> */}
                    </div>
                </div>

                <img src={product.image1} className="img-fluid rounded thumbnail-image" onClick={() => handleClickProduct(product.id)} />


            </div>


            <div className="product-detail-container p-2">

                <div className="">

                    <h5 className="dress-name " onClick={() => handleClickProduct(product.id)}>
                        {product.type}, {product.color}, {product.gender}, {product.age}
                    </h5>

                    <div className="price-old-new">
                        <div onClick={() => handleClickProduct(product.id)}>
                            <span className="old-price ">{resultOld}</span>
                            <br />
                            <span className="new-price">{result}</span>

                        </div>
                        <div className='buy-now'>
                            <span className="btn btn-success mx-1" onClick={handleCheckout} >Mua ngay</span>
                        </div>
                    </div>
                </div>




            </div>

        </div>
    );
}

export default ProductCard;