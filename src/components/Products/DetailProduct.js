import React, { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/apiServices';
import "./DetailProduct.scss"



function DetailProduct(props) {
    const param = useParams()
    const [dataDetail, setDataDetail] = useState({})
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

    useEffect(() => {
        fecthDetailProduct()
        window.scrollTo(0, 0)
    }, [])


    const fecthDetailProduct = async () => {
        const resDetaiPr = await getProductById(param.id)
        setDataDetail(resDetaiPr)
        console.log(resDetaiPr)
    }

    const handleAddCart = async () => {

    }
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
                <p>✔️ Giá: {dataDetail.price}$</p>
                <div className='footer-detail d-flex justify-content-end'>
                    <button onClick={() => handleAddCart()} className='btn btn-dark mb-3 p-2 mt-3'>Thêm vào giỏ hàng</button>
                </div>
            </div>

        </div>
    );
}

export default DetailProduct;