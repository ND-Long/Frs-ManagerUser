import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import SliderAuto from "react-slick";
import imageSlider1 from "../../assets/imageSlider1.jpg"
import imageSlider2 from "../../assets/imageSlider2.jpg"
import imageSlider3 from "../../assets/imageSlider3.jpg"


function Slider() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };

    return (
        <div className="slider-page container">
            <SliderAuto {...settings}>
                <div className="slider-item" >
                    <img className="img-slider" src={imageSlider1} />
                </div>
                <div className="slider-item" >
                    <img className="img-slider" src={imageSlider2} />
                </div>
                <div className="slider-item" >
                    <img className="img-slider" src={imageSlider3} />
                </div>
            </SliderAuto>
        </div>
    );
}
export default Slider