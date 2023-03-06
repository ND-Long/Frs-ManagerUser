import React, { useEffect } from 'react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./DetailProduct.scss"

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

function DetailProduct(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    },)
    return (
        <div className='detail-product container'>
            <div className='img-detail'>
                <ReactImageGallery items={images} />
            </div>
            <div className='content-detail'>
                conent
            </div>
        </div>
    );
}

export default DetailProduct;