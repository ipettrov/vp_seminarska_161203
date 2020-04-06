import React, {Component} from "react";
import axiosService from "../../repository/axiosService";
import Ad from "../AdComponent/Ad";
import Header from "../HeaderComponent/Header";
import Footer from "../FooterComponent/Footer";

class Ads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        axiosService.ads().then((response => {
            this.setState({
                ads: response.data,
                loading: false
            });
        })).catch(error => {
            this.setState({
                ads: [],
                loading: false,
                error: "Neusopehsno zimanje na ads"
            })
        })
    }

    render(){
        if(this.state.loading) {
            return (
                <div>
                    Loading ads
                </div>
            )
        }
        if(this.state.error !== null) {
            return (
                <div>
                    {this.state.error}
                </div>
            )
        }

        let ads = this.state.ads.map(function(ad, i) {
            return (
                <Ad key={i} details={ad}/>
            )
        });

        var list;
        if (ads.length>0){
            list = ads
        }else{
            list = <div><label>Моментално нема ниту еден оглас, пробајте подоцна.</label></div>
        }

        return (
            <div>
                <Header/>

                <div className="ads-wrapper">
                    <div className="container">
                        {list}
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default Ads;



