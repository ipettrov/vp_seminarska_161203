import React, {Component} from "react";
import Header from "../HeaderComponent/Header";
import axiosService from "../../repository/axiosService";
import Footer from "../FooterComponent/Footer";


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            name: '',
            error_message: ''
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
        if (this.state.name){
            if (this.state.email){
                if (this.state.username){
                    if (this.state.password && this.state.password.length >=4){
                        axiosService.register(this.state.name, this.state.email, this.state.username, this.state.password).then(res => {
                            //TODO pokazu poraka na home deka e registriran ili redirekt to login namesto home
                            this.props.history.push('/');
                        }).catch(err => {
                            this.setState({
                                error_message: 'Внесените податоци не се валидни.'
                            })
                        });
                    }else{
                        this.setState({
                            error_message:"Внесете пасворд со повеќе од 4 карактери"
                        })
                    }
                }else{
                    this.setState({
                        error_message:"Внесете корисничко име"
                    })
                }
            }else{
                this.setState({
                    error_message:"Внесете е-маил"
                })
            }
        }else{
            this.setState({
                error_message:"Внесете го вашето име."
            })
        }
    }

    render() {
        let error;
        if (this.state.error_message){
            error = <div className={"alert alert-danger"}> {this.state.error_message} </div>;
        }
        return (
            <div>
                <Header></Header>

                <div className={"login-screen"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">

                                <h3>Регистрирај се бесплатно!</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat fugit magnam, molestiae nostrum soluta ut!</p>

                                {error}

                                <form onSubmit={e => this.submit(e)}>
                                    <div className="form-group">
                                        <label>Вашето име</label>
                                        <input type="text" className={"form-control"} name="name" onChange={e => this.change(e)} value={this.state.name}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Е-маил адреса</label>
                                        <input type="email" className={"form-control"} name="email" onChange={e => this.change(e)} value={this.state.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Корисничко име</label>
                                        <input type="text" className={"form-control"} name="username" onChange={e => this.change(e)} value={this.state.username}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Пасворд</label>
                                        <input type="password" className={"form-control"} name="password" onChange={e => this.change(e)} value={this.state.password}/>
                                    </div>
                                    <button type="submit" className={"btn btn-primary btn-block"}>Регистрирај се</button><br/>
                                    <p>Веќе имаш профил? <a href="/login">Најави се</a></p>

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

export default Register;



