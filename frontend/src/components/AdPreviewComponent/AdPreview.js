import React, {Component} from "react";
import Header from "../HeaderComponent/Header";
import Footer from "../FooterComponent/Footer";
import "./AdPreview.css"

class AdPreview extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <Header/>

                <div className="ad-details">
                    <div className="row">
                        <div className="col-md-5">
                            <img src={"/images/" + this.props.location.state.ad.image + ".jpg"}/>
                        </div>
                        <div className="col-md-7">
                            <h3>{this.props.location.state.ad.title}</h3>
                            <p><span>Број за контакт:</span><b>{this.props.location.state.ad.phoneNumber}</b></p>
                            <p><span>Локација:</span><b>{this.props.location.state.ad.location}</b></p>
                            <p><span>Цена:</span><b>{this.props.location.state.ad.price} МКД</b></p>
                            <p><span>Опис:</span><b>{this.props.location.state.ad.description}</b></p>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default AdPreview;
