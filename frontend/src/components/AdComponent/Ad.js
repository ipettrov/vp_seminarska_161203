import React, {Component} from "react";
import './Ad.css'
import {Link} from "react-router-dom";

class Ad extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const imageUrl = "/images/" + this.props.details.image + ".jpg";
        return (
            <div className={"ad"}>
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <img src={imageUrl} className={"img-fluid"}/>
                    </div>
                    <div className="col-md-6">
                        <h3>{this.props.details.title}</h3>
                        <p>Локација: {this.props.details.location}</p>
                        <p>Цена: {this.props.details.price}</p>
                    </div>
                    <div className="col-md-3">
                        <Link to={{
                            pathname: '/ad/' + this.props.details.id,
                            state: {
                                ad: this.props.details
                            }
                        }} className={"btn btn-secondary btn-block"}>Повеќе Детали</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ad;



