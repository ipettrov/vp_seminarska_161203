import React, {Component} from "react";
import axiosService from "../../repository/axiosService";
import Header from "../HeaderComponent/Header";
import Footer from "../FooterComponent/Footer";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'user',
            password: 'user',
            error_message: undefined
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        axiosService.authenticate(this.state.username, this.state.password).then(res => {
            localStorage.setItem('jwt_token', res.data);
            this.props.history.push('/ads');
        }).catch(err => {
            this.setState({
                error_message:'Invalid username or password'
            })
        });
    }

    render() {
        console.log(this.props.next);
        let error;
        if (this.state.error_message !== undefined){
            error = <div className={"alert alert-danger"}> {this.state.error_message} </div>;
        }
        return (
            <div>
                <Header/>

                <div className={"login-screen"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <h3>Најавете се!</h3>
                                <p>За да можете да објавувате огласи а и воедно да ги следите другите огласи потрегно е да се најавите.</p>
                                {error}
                                <form onSubmit={e => this.submit(e)}>
                                    <div className="form-group">
                                        <label>Корисничко име</label>
                                        <input type="text" className={"form-control"} name="username" onChange={e => this.change(e)} value={this.state.username}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Пасворд</label>
                                        <input type="password" className={"form-control"} name="password" onChange={e => this.change(e)} value={this.state.password}/>
                                    </div>
                                    <button type="submit" className={"btn btn-primary btn-block"}>Најави се</button><br/>
                                    <p className={"text-center small"}>Сеуште се немаш регистрирано? <a href="/register">Регистрирај се бесплатно!</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default Login;
