import React, { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/apiServices';
import "./DetailProduct.scss"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { addToCartRedux } from '../../redux/actions/productActions';
import _ from "lodash"


function DetailProduct(props) {
    const dataAllProduct = useSelector(state => state.product.product)
    const dataAddToCart = useSelector(state => state.product.cartProduct)

    const param = useParams()
    const [dataDetail, setDataDetail] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {

        findProduct()
        window.scrollTo(0, 0)
    }, [])

    const handleAddCart = (data) => {
        dispatch(addToCartRedux(data))
        console.log(">>>list cart", dataAddToCart)

    }


    const findProduct = async () => {
        const find = dataAllProduct.find((item) => +item.id === +param.id)

        if (find) {
            setDataDetail(find)

        } else {
            const resDetaiPr = await getProductById(param.id)
            setDataDetail(resDetaiPr)
        }
    }




    const images = [
        {
            original: dataDetail.image1,
            thumbnail: dataDetail.image1,
        },
        {
            original: dataDetail.image2,
            thumbnail: dataDetail.image2,
        },
        {
            original: dataDetail.image3,
            thumbnail: dataDetail.image3,
        },
    ];








    return (

        <div className='detail-product container'>
            <div className='img-detail'>
                <ReactImageGallery className="image" items={images} />
            </div>
            <div className='content-detail'>
                <p>✔️ Giống: {dataDetail.type}</p>
                <p>✔️ Màu sắc: {dataDetail.color}</p>
                <p>✔️ Giới tính: {dataDetail.gender}</p>
                <p>✔️ Tuổi: {dataDetail.age}</p>
                <p>✔️ Đặc điểm: {dataDetail.characteristic}</p>
                <p>✔️ Nguồn gốc: {dataDetail.source}</p>
                <p >✔️ Giá: <span style={{ color: "red" }}> {dataDetail.price}$</span></p>
                <div className='footer-detail d-flex justify-content-end'>
                    <button onClick={() => handleAddCart(dataDetail)} className='btn btn-dark mb-3 p-2 mt-3'>Thêm vào giỏ hàng</button>
                </div>
            </div>

        </div >

    );
}

export default DetailProduct;