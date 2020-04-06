import React, {Component} from "react";
import './Footer.css'

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
                <div className={"footer"}>
                    <div className="container">
                        Сите права се задржани &copy; 2020 Купи/Продај Online
                    </div>
               </div>
        )
    }
}

export default Footer;




