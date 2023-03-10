import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Checkout.scss"
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { decreaseCart, deleteAllCart, deleteCart, increaseCart } from '../../redux/actions/productActions';
import Select from 'react-select';
import { getDistrict, postCartOrder } from '../services/apiServices';
import { toast } from 'react-toastify';
import OrderCart from './OrderCart';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


function Checkout(props) {
    const dataCart = useSelector(state => state.product.cartProduct)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let totalPrice = 0
    const [resultTotalPrice, setResultTotalPrice] = useState(0)
    const [displayTotalPrice, setDisplayTotalPrice] = useState('0 đ')
    const [showModalOrder, setShowModalOrder] = useState(false)
    const [codeProduct, setCodeProduct] = useState("")
    const handelIncreaseProduct = (data) => {
        // console.log(data)
        dispatch(increaseCart(data))
    }
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [ward, setWWArd] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')

    const handelDecreaseProduct = (data) => {
        dispatch(decreaseCart(data))
    }

    const handelDeleteProduct = (data) => {
        dispatch(deleteCart(data))
    }

    useEffect(() => {
        const resDistrict = getDistrict()
        console.log(resDistrict)
    }, [])

    const fetchDistrict = () => { }

    useEffect(() => {
        countPrice()
    }, [dataCart])

    const countPrice = () => {
        let count = 0
        dataCart.map(item => {
            count += +item.quantity * +item.price
        })
        let resultPrice = count.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
        setResultTotalPrice(count)
        setDisplayTotalPrice(resultPrice)
    }
    const handleOrder = async () => {
        if (dataCart.length == 0) {
            toast.error("Giỏ hàng trống!")
            return
        }

        let newID = Math.floor(Math.random() * Date.now())
        // console.log(newID)
        let listCart = {}
        let cartPush = []
        dataCart.map(item => {
            cartPush.push({
                cartId: item.id,
                quantity: +item.quantity,
                price: +item.price,
                image: item.image1,
                name: `${item.type} - ${item.color} - ${item.gender}`
            })
        })

        listCart = {
            code: newID,
            state: "waiting",
            cart: cartPush,
            totalPrice: resultTotalPrice
        }

        try {
            await postCartOrder(listCart)
            dispatch(deleteAllCart())
            setCodeProduct(newID)
            setShowModalOrder(true)
        } catch (error) {
            toast.error("Máy chủ lỗi")
        }
    }

    return (
        <div className='checkout-container container pt-5 pb-5'>
            <div className='checkout-header '>
                <div className='list-cart-product'>
                    <h5 style={{ fontWeight: "700" }}>Giỏ hàng</h5>
                    {
                        dataCart.length > 0 ?
                            <>
                                {
                                    dataCart.map((item) => {
                                        var number = +item.quantity * +item.price;
                                        let resultPrice = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                        totalPrice += number

                                        // setResultTotalPrice(resultTotal)
                                        return (
                                            <div className='content-checkout pt-3 pb-3' key={item.id}>
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
                                                        <div className="quantity">
                                                            <span className='minus' onClick={() => handelDecreaseProduct(item)}>-</span>
                                                            <span>{+item.quantity}</span>
                                                            <span className='plus' onClick={() => handelIncreaseProduct(item)}>+</span>
                                                        </div>
                                                        <div  >
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

                    <div className='total-price-demo'>
                        <div>
                            <p>Tạm tính</p>
                            <p>Phí giao hàng</p>

                        </div>
                        <div>
                            <p className='number'>{displayTotalPrice}</p>
                            <p className='number'>Miễn phí</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='total-price-demo'>
                        <div >
                            <p>Tổng</p>
                        </div>
                        <div>
                            <p className='price' >{displayTotalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className='infro-transport'>
                    <h5 style={{ fontWeight: "700" }} >Thông tin vận chuyển</h5>
                    <form className='needs-validation' >
                        <div className="row">
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputName">Họ và tên</label>
                                <input type="text" className="form-control" id="inputName" placeholder="Họ và tên" required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputPhone">Số điện thoại</label>
                                <input type="number" className="form-control" id="inputPhone" placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="text" className="form-control" id="inputEmail" placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="inputAddress">Địa chỉ</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="Địa chỉ"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="inputState">Tỉnh</label>
                                <Select
                                    placeholder={<div>Tỉnh</div>}
                                    // value={selectedOption}
                                    // onChange={this.handleChange}
                                    options={options}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Huyện</label>
                                <Select
                                    placeholder={<div>Huyện</div>}
                                    // value={selectedOption}
                                    // onChange={this.handleChange}
                                    options={options}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Xã</label>
                                <Select
                                    placeholder={<div>Xã</div>}
                                    // value={selectedOption}
                                    // onChange={this.handleChange}
                                    options={options}
                                />
                            </div>

                            <div className="form-">
                                <label htmlFor="inputNote">Ghi chú</label>
                                <input type="text" className="form-control" id="inputNote" placeholder='Ghi chú' />
                            </div>
                        </div>
                        <hr />
                        <h5 style={{ fontWeight: "700" }} >Hình thức thanh toán</h5>

                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Thanh Toán MoMo
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="radio" name="cod-pay" id="cod-pay" defaultChecked />
                            <label className="form-check-label" htmlFor="cod-pay">
                                COD - Thanh toán khi nhận hàng
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Ví điện tử ZaloPay
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Ví ShopeePay
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                Thẻ ATM / Internet Banking / Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card) / VNPay QR
                            </label>
                        </div>
                        <div className="form-check mb-3"  >
                            <input className="form-check-input" type="radio" disabled />
                            <label className="form-check-label" >
                                VNPay QR
                            </label>
                        </div>
                        <button type="submit" onClick={() => handleOrder()} className="btn btn-dark mb-5" style={{ width: "100%" }}>{`Thanh toán ${displayTotalPrice}`}</button>
                    </form>
                </div>

            </div>
            <OrderCart
                show={showModalOrder}
                setShow={setShowModalOrder}
                codeProduct={codeProduct}
            />
        </div>
    );
}

export default Checkout;