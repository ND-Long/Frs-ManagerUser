import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Checkout.scss"
import { GrClose } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCartRedux, decreaseBuyOne, decreaseCart, deleteAllCart, deleteCart, increaseCart } from '../../redux/actions/productActions';
import Select from 'react-select';
import { getDistrict, getProvince, getWard, postCartOrder } from '../services/apiServices';
import { toast } from 'react-toastify';
import OrderCart from './OrderCart';
import _ from "lodash"
import { putInfoUserAction, putUpdateInfoUserRedux } from '../../redux/actions/userActions';



function Checkout(props) {
    const param = useParams()
    const navigate = useNavigate()
    const dataCartAll = useSelector(state => state.product.cartProduct)
    const userLogin = useSelector(state => state.account.user)
    const auth = useSelector(state => state.account.user.auth)
    const cloneUserLogin = _.cloneDeep(userLogin)
    const dispatch = useDispatch()
    if (!cloneUserLogin.listOrder) {
        cloneUserLogin.listOrder = []
    }

    let totalPrice = 0
    const [resultTotalPrice, setResultTotalPrice] = useState(0)
    const [displayTotalPrice, setDisplayTotalPrice] = useState('0 đ')
    const [showModalOrder, setShowModalOrder] = useState(false)
    const [codeProduct, setCodeProduct] = useState("")
    const handelIncreaseProduct = (data) => {
        dispatch(increaseCart(data))
    }
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [ward, setWArd] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [optionsWard, setOptionsWArd] = useState('')
    const [optionsDistrict, setOptionsDistrict] = useState('')
    const [optionsProvince, setOptionsProvince] = useState('')
    const [isDisabledDistrict, setIsDisabledDistrict] = useState(true)
    const [isDisabledWard, setIsDisabledWard] = useState(true)
    let indexCartBuyOne = dataCartAll.findIndex(item => +item.id === +param.id)
    const [counterBuyone, setCounterBuyone] = useState(0)
    let dataCart = []
    let itemBuyOne = dataCartAll[+indexCartBuyOne]
    if (!param.id) {
        dataCart = dataCartAll
    }

    if (param.id) {
        if (indexCartBuyOne !== -1) {
            if (counterBuyone == 0) {
                if (itemBuyOne.quantity > 1) {
                    dispatch(decreaseBuyOne(itemBuyOne))
                }
                setCounterBuyone(prev => prev + 1)
            }
            dataCart.push(itemBuyOne)
        }
    }

    const handelDecreaseProduct = (data) => {
        dispatch(decreaseCart(data))
    }

    const handelDeleteProduct = (data) => {
        if (!param.id) {
            dispatch(deleteCart(data))
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProvince()
    }, [])

    const fetchProvince = async () => {
        let options = [];
        try {
            const resProvince = await getProvince()
            resProvince.map((item) => {
                options.push({
                    value: item.name,
                    label: item.name,
                    code: item.code,
                    codename: item.codename,
                    district: item.district,
                    division_type: item.division_type,
                    name: item.name,
                    phone_code: item.phone_code
                })
            })
            setOptionsProvince(options)
        } catch (error) {
            toast.error("Máy chủ lỗi!")
        }
    }

    const handleChooseProvince = async (type, value) => {
        let options = [];

        switch (type) {
            case "PROVINCE":
                setDistrict('')

                setWArd('')
                try {
                    const resDistrict = await getDistrict(value.code)
                    resDistrict.districts.map((item) => {
                        options.push({
                            value: item.name,
                            label: item.name,
                            code: item.code,
                            codename: item.codename,
                            district: item.district,
                            division_type: item.division_type,
                            name: item.name,
                            phone_code: item.phone_code
                        })
                    })
                    setOptionsDistrict(options)
                    setProvince(value.value)
                    setIsDisabledDistrict(false)
                } catch (error) {
                    toast.error("Máy chủ lỗi!")
                }
                break;
            case "DISTRICT":
                setWArd('')

                try {
                    const resWard = await getWard(value.code)
                    resWard.wards.map((item) => {
                        options.push({
                            value: item.name,
                            label: item.name,
                            code: item.code,
                            codename: item.codename,
                            ward: item.ward,
                            division_type: item.division_type,
                            name: item.name,
                            phone_code: item.phone_code
                        })
                    })
                    setOptionsWArd(options)
                    setDistrict(value.value)
                    setIsDisabledWard(false)
                } catch (error) {
                    toast.error("Máy chủ lỗi!")
                }
                break;
            case "WARD":
                setWArd(value.value)
                break;

            default:
                toast.error("Máy chủ lỗi!")
        }
    }

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

        //validate
        if (!name || !phone || !email || !province || !district || !ward) {
            if (!name) {
                toast.error("Tên không được để trống!")
            }
            if (!phone) {
                toast.error("SĐT không được để trống!")
            }
            if (!email) {
                toast.error("Email không được để trống!")

            }
            if (!province) {
                toast.error("Tỉnh không được để trống!")

            }
            if (!district) {
                toast.error("Huyện không được để trống!")

            }
            if (!ward) {
                toast.error("Xã không được để trống!")

            }
            return
        }

        let newID = Math.floor(Math.random() * Date.now())
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
        var d = new Date();
        function createAt(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            let hour = d.getHours();
            let minute = d.getMinutes();
            let second = d.getSeconds();



            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            if (hour.length < 2) {
                if (hour == 0) {
                    hour = '00';
                } else {
                    hour = '0' + hour
                }
            }
            if (minute.length < 2) {
                if (minute == 0) {
                    minute = '00';
                } else {
                    minute = '0' + minute
                }
            }
            if (second.length < 2) {
                if (second == 0) {
                    second = '00';
                } else {
                    second = '0' + second
                }
            }

            let createAt = hour + ":" + minute + ":" + second + " " + day + "/" + month + "/" + year

            return createAt;
        }


        listCart = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            ward: ward,
            district: district,
            province: province,
            code: newID,
            state: "waiting",
            cart: cartPush,
            totalPrice: resultTotalPrice,
            createAt: createAt(d)
        }

        try {
            if (auth === true) {
                //push order to user
                cloneUserLogin.listOrder.push(listCart)
                dispatch(putUpdateInfoUserRedux(cloneUserLogin))
                dispatch(putInfoUserAction(cloneUserLogin))
            }
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
                                    </>
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
                            </> :
                            <>
                                Giỏ hàng trống
                                <hr />
                            </>

                    }

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



                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="inputState">Thành phố/Tỉnh</label>
                                <Select
                                    placeholder={<div>TP/Tỉnh</div>}
                                    onChange={e => handleChooseProvince("PROVINCE", e)}
                                    options={optionsProvince}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Quận/Huyện</label>
                                <Select
                                    placeholder={<div>Quận/Huyện</div>}
                                    onChange={e => handleChooseProvince("DISTRICT", e)}
                                    options={optionsDistrict}
                                    isDisabled={isDisabledDistrict}
                                    value={{ label: district }}
                                />
                            </div>
                            <div className=" col-md-4 mb-3">
                                <label htmlFor="inputState">Phường/xã</label>
                                <Select
                                    placeholder={<div>Phường/xã</div>}
                                    onChange={e => handleChooseProvince("WARD", e)}
                                    options={optionsWard}
                                    isDisabled={isDisabledWard}
                                    value={{ label: ward }}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="inputAddress">Địa chỉ</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Địa chỉ"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
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
                        <button type="button" onClick={() => handleOrder()} className="btn btn-dark mb-5" style={{ width: "100%" }}>{`Thanh toán ${displayTotalPrice}`}</button>
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