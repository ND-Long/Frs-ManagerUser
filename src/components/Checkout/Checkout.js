import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Checkout.scss"
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { decreaseCart, deleteCart, increaseCart } from '../../redux/actions/productActions';



function Checkout(props) {
    const dataCart = useSelector(state => state.product.cartProduct)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handelIncreaseProduct = (data) => {
        // console.log(data)
        dispatch(increaseCart(data))
    }

    const handelDecreaseProduct = (data) => {
        dispatch(decreaseCart(data))
    }

    const handelDeleteProduct = (data) => {
        dispatch(deleteCart(data))
    }

    return (
        <div className='checkout-container container pt-5'>
            <div className='checkout-header '>
                <div className='list-cart-product'>
                    <h5 style={{ fontWeight: "700" }}>Giỏ hàng</h5>
                    {
                        dataCart.length > 0 ?
                            <>
                                {
                                    dataCart.map((item) => {
                                        console.log(item)
                                        var number = +item.quantity * +item.price;
                                        const resultPrice = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                        return (
                                            <div className='content-checkout pt-3 pb-3'>
                                                <div className='image-product-checkout'>
                                                    <img src={item.image1} />
                                                    <span className='counter-product'>
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className='content-product-checkout'>
                                                    <div className='header-product-checkout'>
                                                        <h6 className='infor-product-cart' onClick={() => { navigate(`/product/${item.id}`) }}>{item.type} - {item.color}
                                                            - {item.gender}
                                                        </h6>
                                                        <GrClose onClick={() => handelDeleteProduct(item)} className='icon-close' />
                                                    </div>
                                                    <div className='footer-product-checkout'>
                                                        <div class="quantity">
                                                            <span className='minus' onClick={() => handelDecreaseProduct(item)}>-</span>
                                                            <span>{+item.quantity}</span>
                                                            <span className='plus' onClick={() => handelIncreaseProduct(item)}>+</span>
                                                        </div>
                                                        <div className='price' style={{ color: "red" }}>
                                                            {resultPrice}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </> :
                            <>Giỏ hàng trống</>

                    }
                    <hr />
                </div>
                <div className='infro-transport'>
                    <h5 style={{ fontWeight: "700" }} >Thông tin vận chuyển</h5>
                </div>

            </div>
        </div>
    );
}

export default Checkout;