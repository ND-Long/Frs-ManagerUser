import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, getSearchOrder } from '../services/apiServices';

import { v4 as uuidv4 } from 'uuid';
import { USER_LOGIN } from '../../redux/actions/userActions';
function UserListOrder(props) {
    const listOrderUser = useSelector(state => state.account.listOrderUser)
    const infoUser = useSelector(state => state.account.user)
    const dispatch = useDispatch()


    let listOrder = []

    if (infoUser.listOrder && infoUser.listOrder.length > 0) {
        for (let i = infoUser.listOrder.length - 1; i >= 0; i--) {
            listOrder.push(infoUser.listOrder[i])

        }
        // listOrder = infoUser.listOrder.reverse()
    }

    const handeDeleteState = (event) => {
        const indexOrderState = infoUser.listOrder.findIndex(item => item.code === event.code)
        console.log(event)
        console.log(infoUser.listOrder[indexOrderState].state)
    }



    return (
        <>
            {
                listOrder && listOrder.length > 0 ?
                    <div className='user-profile'>
                        <h5 >Danh sách đơn hàng { }</h5>
                        {
                            listOrder.map((item) => {
                                let resultTotalPrice = item.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                return (
                                    <>
                                        {
                                            item.code ?
                                                <div key={uuidv4().toString()} className='user-order-container mt-3'>
                                                    <div className='user-order-header'>
                                                        <div>
                                                            <div>
                                                                #{item.code}
                                                            </div>
                                                            <div style={{ fontWeight: "400" }}>
                                                                {item.createAt}
                                                            </div>

                                                        </div>
                                                        <div className='state-order'>
                                                            {
                                                                item.state == "waiting" ?
                                                                    <div> Chờ xác nhận</div>
                                                                    :
                                                                    <div>Đã huỷ</div>
                                                            }

                                                        </div>
                                                    </div>
                                                    {
                                                        item.cart.map((itemCart) => {
                                                            var priceProduct = +itemCart.quantity * +itemCart.price;
                                                            let resultPrice = priceProduct.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                                            return (
                                                                <div key={uuidv4().toString()} className='user-order-content'>
                                                                    <div className='top  p-3'>
                                                                        <div className='image-detail-order'>
                                                                            <img className='image-detail' src={itemCart.image} />
                                                                        </div>
                                                                        <div className='detail-order'>
                                                                            <span>{itemCart.name}</span>
                                                                            <span style={{ fontWeight: "600" }}>x{itemCart.quantity}</span>
                                                                            <span style={{ fontWeight: "600" }}>{resultPrice}</span>
                                                                        </div>
                                                                        <div className='button-rate1 ' >
                                                                            <button className='btn btn-dark mb-2 mt-2'>Đánh giá sản phẩm</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex justify-content-center' >
                                                                        <button className='button-rate1 button-rate2 btn btn-dark mb-3 mt-2'>Đánh giá sản phẩm</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div className='user-order-footer d-flex justify-content-between'>
                                                        <div className='delete-order' onClick={() => handeDeleteState(item)}>
                                                            Huỷ đơn
                                                        </div>
                                                        <div className='total-price'>
                                                            Tổng đơn hàng: {resultTotalPrice}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                    :
                    <h5>Bạn chưa có đơn hàng</h5>
            }
        </>
    );
}

export default UserListOrder;