import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSearchOrder } from '../services/apiServices';

import "./SearchOrder.scss"


function SearchOrder(props) {
    const [idOrder, setIdOrder] = useState('')
    const [isFoundOrder, setIsFoundOrder] = useState(false)
    const [stateOrder, setStateOrder] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [phoneUser, setPhoneUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [addressUser, setAddressUser] = useState("")
    const [wardUser, setWardUser] = useState("")
    const [districtUser, setDistrictUser] = useState("")
    const [provinceUser, setProvinceUser] = useState("")
    const [listOrder, setListOrderUser] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate()
    const param = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
        if (param.id) {
            setIdOrder(param.id)
            searchOrder()
        }
    }, [param])

    const handleSearchIdOrder = async () => {
        setIsFoundOrder(false)
        if (idOrder) {

            setTotalPrice('')
            setAddressUser('')
            setDistrictUser('')
            setEmailUser('')
            setNameUser('')
            setPhoneUser('')
            setProvinceUser('')
            setWardUser('')
            setListOrderUser('')
            navigate(`/search-order/${idOrder}`)
        } else {
            toast.error("Hãy nhập mã đơn hàng!")
        }
    }

    const searchOrder = async () => {
        try {
            let res = []
            if (param.id) {
                setIdOrder(param.id)
                res = await getSearchOrder(+param.id)
            } else {
                res = await getSearchOrder(+idOrder)
            }
            // res = await getSearchOrder(idOrder)
            if (res.length <= 0) {
                toast.error("Kiểm tra lại mã đơn hàng")
                setIsFoundOrder(false)
            }
            if (res.length > 0) {
                let totalPriceDisplay = res[0].totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"

                setIsFoundOrder(true)
                setTotalPrice(totalPriceDisplay)
                setAddressUser(res[0].address)
                setDistrictUser(res[0].district)
                setEmailUser(res[0].email)
                setNameUser(res[0].name)
                setPhoneUser(res[0].phone)
                setProvinceUser(res[0].province)
                setWardUser(res[0].ward)
                setListOrderUser(res[0].cart)

                if (res[0].state == "waiting") {
                    setStateOrder("Chờ xác nhận")
                }
            }

        } catch (error) {
            toast.error("Máy chủ lỗi!")
        }
    }

    return (
        <div className='search-order-page mx-auto pt-5 col-md-5 p-3 pb-5 '>
            <p className="header-search-order pt-2 text-center" >TRA CỨU ĐƠN HÀNG</p>
            <div className='input-search-order  mx-auto '>
                <input className='form-control ' placeholder='Nhập mã đơn hàng'
                    value={idOrder}
                    onChange={(e) => setIdOrder(e.target.value)}
                />
                <button className='btn btn-dark mt-3 ' style={{ width: "100%" }}
                    onClick={() => handleSearchIdOrder()}
                >Xác nhận</button>
            </div>
            {
                isFoundOrder ?
                    <>
                        <div className='show-result-order mx-auto mt-3 container'>
                            <h6 className="state-order-header pt-4"  >
                                TRẠNG THÁI ĐƠN HÀNG <span className='code-order'>#{param.id}</span>
                            </h6>
                            <div className='underline' />
                            <div className='state-order mt-2'>
                                <p>{stateOrder}</p>
                            </div>
                        </div>

                        <div className='show-infor-order mx-auto mt-3 container'>
                            <h6 className="state-order-header pt-4"  >
                                THÔNG TIN KHÁCH HÀNG
                            </h6>
                            <div className='underline' />
                            <div className='infor-user mt-2'>
                                <div className='infor-left'>
                                    <p className='left'>Họ tên:</p>
                                    <p className='right'>
                                        {nameUser}
                                    </p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Điện thoại:</p>
                                    <p className='right'>{phoneUser}</p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Email:</p>
                                    <p className='right'>{emailUser}</p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Địa chỉ:</p>
                                    <p className='right'>{addressUser}</p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Phường/xã:</p>
                                    <p className='right'>{wardUser}</p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Quận/Huyện:</p>
                                    <p className='right'>{districtUser}</p>
                                </div>
                                <div className='infor-left'>
                                    <p className='left'>Thành phố/Tỉnh:</p>
                                    <p className='right'>{provinceUser}</p>
                                </div>
                            </div>
                        </div>

                        <div className='show-result-order mx-auto mt-3 container pb-2'>
                            <h6 className="state-order-header pt-4"  >
                                DANH SÁCH SẢN PHẨM
                            </h6>
                            <div className='underline' />
                            {
                                listOrder.map((item) => {
                                    let priceOneProduct = item.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                    let number = +item.quantity * +item.price;
                                    let resultPrice = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
                                    return (
                                        <div className='list-order-product pt-2 pb-2'>
                                            <div className='image-list-left'>
                                                <img className='image-left' src={item.image} />
                                            </div>
                                            <div className='infor-list-right'>
                                                <div>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span>
                                                        Giá:
                                                    </span> {priceOneProduct}

                                                </div>
                                                <div>
                                                    <span>
                                                        Số lượng:
                                                    </span> {item.quantity}
                                                </div>

                                                <div className='pt-2'>
                                                    <span>{resultPrice}</span>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='underline' />
                            <div className='total-price-search p-2' >
                                <span>Tổng: {totalPrice}</span>
                            </div>
                        </div>

                    </>
                    : <></>
            }
        </div >
    );
}

export default SearchOrder;