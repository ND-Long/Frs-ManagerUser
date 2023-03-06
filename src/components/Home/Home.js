import ListProducts from "../Products/ListProducts";
import Slider from "./Slider";
import axios from "axios";
import { useEffect } from "react";

function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="homePage">
            <div className="homePage-slider">
                <Slider />
            </div>
            <div className="homePage-list-product">
                <ListProducts />
            </div>
        </div>
    );
}

export default Home;