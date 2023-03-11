import React, { useState } from 'react';
import { Carousel } from '3d-react-carousal';
import "./Slider.scss"
import imageSlider1 from "../../assets/imageSlider1.jpg"
import imageSlider2 from "../../assets/imageSlider2.jpg"
import imageSlider3 from "../../assets/imageSlider3.jpg"


const Slider = () => {
    let slides = [
        <img src={imageSlider1} alt="1" />,
        <img src={imageSlider2} alt="2" />,
        <img src={imageSlider3} alt="3" />,
    ];
    return (
        <div className="slider pt-3 pb" >
            <Carousel slides={slides} autoplay={true} interval={4000} />
        </div>
    );
}


export default Slider



