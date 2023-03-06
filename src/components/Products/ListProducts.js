import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./Product.scss"

function ListProducts(props) {
    const navigate = useNavigate()
    const handleClickProduct = () => {
        navigate("/product/1")
    }
    return (
        <div className='listProduct-content mx-3' >
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
            <div className="card-product h-100" >
                <div onClick={() => handleClickProduct()}>
                    <div className='card-img-top'>
                        <img className="img-top" src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-42.jpg" alt="..." />
                    </div>
                    <div className="card-body mt-2 mx-1">
                        <div className="text-center">
                            <h5 className="fw-bolder">Fancy Product</h5>
                            $40.00 - $80.00
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                    <button className='btn btn-dark mt-4'>Thêm vào giỏ hàng</button>
                </div> */}
            </div>
        </div>
    );
}

export default ListProducts;