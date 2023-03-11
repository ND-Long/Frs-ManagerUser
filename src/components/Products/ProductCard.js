import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

ProductCard.propTypes = {

};

function ProductCard(props) {
    const [readMore, setreadMore] = useState(false);
    useEffect(() => {

    }, [])




    const navigate = useNavigate()

    const handleClickProduct = (event) => {
        navigate(`/product/${event}`)
    }
    const { product } = props
    var number = +product.price;
    const result = number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) + " đ"
    return (
        <div className="card-product h-100" >
            <div >
                <div className='card-img-top' onClick={() => handleClickProduct(product.id)}>
                    <img className="img-top" src={product.image1} alt="..." />
                </div>
                <div className="card-body mt-2 mx-1" onClick={() => handleClickProduct(product.id)}>
                    <div className='text-infor'>
                        {/* <span className="">Giống: {product.type}</span> */}
                        <div

                            style={{ fontSize: readMore ? "12px" : "16px" }}
                        >
                            {/* {props.description.slice(0, 50) + "...."} */}
                            <div className="product-description">

                                {/* <span className='description-full'>
                                    {` ${product.type.slice(0, 300)} `}
                                </span>

                                <span className='description-mini'>
                                    {` ${product.type.slice(0, 20)} ... `}
                                </span> */}

                                <span>
                                    {` ${product.type} - ${product.color} - ${product.age} - ${product.gender} `}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='text-price'>
                        {result}
                    </div>
                    {/* <button className='btn btn-dark my-3 float-sm-left'>Thêm</button> */}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;