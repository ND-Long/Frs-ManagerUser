import ListProducts from "../Products/ListProducts";
import Slider from "./Slider";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PerfectScrollbar from 'react-perfect-scrollbar'

function Home(props) {
    const resProductRedux = useSelector(state => state.product.product)
    return (
        // <PerfectScrollbar>
        <div className="homePage">
            <div className="homePage-slider">
                <Slider />
            </div>
            <div className="homePage-list-product">
                <ListProducts />
            </div>
        </div>
        // </PerfectScrollbar>
    );
}

export default Home;