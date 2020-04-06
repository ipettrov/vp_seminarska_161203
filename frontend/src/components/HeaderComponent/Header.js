import React, {Component} from "react";
import './Header.css'
import {Link} from "react-router-dom";
import {getCurrentUser} from "../../helpers/current_user";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        };
        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        this.setState({
            user: getCurrentUser()
        })
    }

    logOut(e) {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("current_user");
    }

    render() {
        let userMessage = "Не сте најавени!";
        let registerButtons =
            <span>
                <Link to="/login" class="link">Најави се</Link>
                <Link to="/register" class="link">Регистрирај се</Link>
            </span>;
        if (this.state.user != null && JSON.parse(this.state.user) !== null) {
            userMessage = "Добредојде " + JSON.parse(this.state.user).name;
            registerButtons =
                <span>
                    <Link to="/ads" class="link">Сите огласи</Link> &nbsp; &nbsp;
                    <Link to="/create_ad" class="link">Креирај Оглас</Link> &nbsp; &nbsp;
                    <a href="/" className="link" onClick={e => this.logOut(e)}>Одјави се</a>
                </span>;
        }
        return (
            <header className={"header"}>
                <div className="container">
                    <label className="brand"><a href="/">Купи/Продај Online!</a></label>
                    <label className={"message"}>{userMessage}</label>
                    <label className={"float-right"}> {registerButtons}</label>
                </div>
            </header>
        )
    }
}

export default Header;




