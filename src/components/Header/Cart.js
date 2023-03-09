import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import "./Header.scss"
function Cart(props) {
    const { show, setShow } = props
    const dataCart = useSelector(state => state.product.cartProduct)
    console.log(dataCart)
    const handleClose = () => setShow(false);
    return (
        <div className='cart-model' >

            <Modal show={show} onHide={handleClose} className='cart-shopping'>
                <Modal.Header closeButton>
                    <Modal.Title>Giỏ hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <div className='cart-body'>
                        {
                            dataCart.map((item) => (
                                <div className='cart-product mt-1 mb-3' >
                                    <div className="img-cart-product">
                                        <img className='img-cart-product' src='https://vothisaucamau.edu.vn/wp-content/uploads/2022/12/1671385168_234_Anh-Meo-Cute-De-Thuong-Dang-Yeu-Den-Ngan-Ngo.jpg' />
                                    </div>
                                    <div className="detail-product-cart">
                                        <div>
                                            Meof ddaay
                                        </div>
                                        <div className="price">
                                            99.000đ
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Cart