import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Home.scss"
import imageSlider1 from "../../assets/imageSlider1.jpg"
import imageSlider2 from "../../assets/imageSlider2.jpg"
import imageSlider3 from "../../assets/imageSlider3.jpg"
function Slider() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className='item-slider'>
                <div className='image-slider'>
                    <img
                        className="d-block w-100"
                        src={imageSlider1}
                        alt="First slide"
                    />
                </div>
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item className='item-slider'>
                <div className='image-slider'>
                    <img
                        className="d-block w-100"
                        src={imageSlider2}
                        alt="First slide"
                    />
                </div>

                {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item className='item-slider'>
                <div className='image-slider'>
                    <img
                        className="d-block w-100"
                        src={imageSlider3}
                        alt="First slide"
                    />
                </div>
                {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider