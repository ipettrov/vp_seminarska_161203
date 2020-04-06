import React, {Component} from "react";
import Header from "../HeaderComponent/Header";
import Footer from "../FooterComponent/Footer";
import {getCurrentUser} from "../../helpers/current_user";
import {Link} from "react-router-dom";
import axiosService from "../../repository/axiosService";

class Home extends Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // axiosService.initData().then(r => {});
    }

    render(){
        return (
            <div>
                <Header/>
                <div className={"home-page"}>
                    <div className="container">
                        <h3>Огласи низ цела Македонија!</h3>
                        <h5>Објави го твојот оглас сега, бесплатно!</h5>
                        <Link to="/create_ad" className={"btn btn-primary mt-4"}>Додај нов оглас</Link>
                        <img src="/images/macedonia.jpg" className={"img-fluid my-5"} alt={"/images/macedonia1.png"}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Home;


