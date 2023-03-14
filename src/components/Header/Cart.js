import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.scss"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
function Cart(props) {
    const { show, setShow } = props
    const dataCart = useSelector(state => state.product.cartProduct)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClose = () => {
        setShow(false)
    };
    const handleCheckout = () => {
        handleClose()
        navigate('/checkout')
    };

    const handleDetailsProduct = (event) => {
        navigate(`/product/${event}`)
        handleClose()

    }

    return (
        <div className='cart-model ' >

            <Modal show={show} onHide={handleClose} className='cart-shopping'>
                <Modal.Header closeButton >
                    <Modal.Title>Giỏ hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <PerfectScrollbar>
                        <div className='cart-body'>
                            {
                                dataCart.length <= 0 ?
                                    <>
                                        Giỏ hàng của bạn trống
                                    </> :
                                    <>
                                        {
                                            dataCart.map((item) => {
                                                var number = +item.price;
                                                const result = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                                return (
                                                    <div key={item.id} className='cart-product mt-1 mb-5'  >
                                                        <div className="img-cart-product mt-1" onClick={() => handleDetailsProduct(item.id)}>
                                                            <img className='img-cart-product' src={item.image1} />
                                                            <span className='quantity-product'>{item.quantity || 1}</span>
                                                        </div>
                                                        <div className="detail-product-cart">
                                                            <div onClick={() => handleDetailsProduct(item.id)}>
                                                                {` ${item.type.slice(0, 30)} ... `}
                                                            </div>
                                                            <div className="price me-3">
                                                                {result}
                                                            </div>

                                                        </div>
                                                        <GrClose className='icon-delete-cart ' />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </div>
                    </PerfectScrollbar>

                </Modal.Body>
                {
                    dataCart.length <= 0 ?
                        <>
                        </> :
                        <Modal.Footer>
                            <Button variant="dark" onClick={handleCheckout}>
                                Thanh toán
                            </Button>
                        </Modal.Footer>
                }
            </Modal>
        </div>
    );
}

export default Cart