import React, {Component} from "react";
import {getCurrentUser} from "../../helpers/current_user";
import {getJwt} from "../../helpers/jwt";
import Header from "../HeaderComponent/Header";
import axiosService from "../../repository/axiosService";
import Footer from "../FooterComponent/Footer";
import './CreateAd.css'

class CreateAd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            phone_number: '',
            price: '',
            description: '',
            location: '',
            selected_file: null,
            error_message: ""
        };
        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        if (!getCurrentUser()) {
            this.props.history.push('/login');
        }
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeFile = event => {
        this.setState({
            selected_file: event.target.files[0]
        })
    };

    submit(e) {
        e.preventDefault();
        if (this.state.title) {
            if (this.state.description) {
                if (!isNaN(this.state.phone_number) && this.state.phone_number) {
                   if (!isNaN(this.state.price) && this.state.price){
                       if (this.state.location) {
                           if (this.state.selected_file) {
                               axiosService.create_ad(this.state.title, this.state.phone_number, this.state.description, this.state.location, this.state.selected_file,this.state.price, getJwt()).then(res => {
                                   console.log('created');
                                   this.props.history.push('/ads');
                               }).catch(err => {
                                   console.log("create ad " + err);
                               });
                           } else {
                               this.setState({
                                   error_message: "Внесете една слика за вашиот оглас"
                               })
                           }
                       } else {
                           this.setState({
                               error_message: "Внесете локација за вашиот оглас"
                           })
                       }
                   }else{
                       this.setState({
                           error_message: "Внесете валидна цена за вашиот оглас"
                       })
                   }
                } else {
                    this.setState({
                        error_message: "Внесете телефонски број за вашиот оглас"
                    })
                }
            } else {
                this.setState({
                    error_message: "Внесете опис на вашиот оглас"
                })
            }
        } else {
            this.setState({
                error_message: "Внесете наслов за вашиот оглас"
            })
        }
    }

    render() {
        let error;
        if (this.state.error_message) {
            error = <div className={"alert alert-danger"}> {this.state.error_message} </div>;
        }
        return (
            <div>
                <Header/>

                <div className="login-screen">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <h3>Креирај оглас!</h3>
                                <p>Овде можете да го креирате вашиот бесплатен оглас.<br/>
                                    Внесете точни податоци со цел да бидете успешно исконтактирани од потенцијални купувачи на вашиот производ/услуга.<br/>
                                    Напомена: Цените се изразени само во денари.</p>

                                {error}

                                <form onSubmit={e => this.submit(e)}>
                                    <div className="form-group">
                                        <label>Наслов на вашиот оглас</label>
                                        <input type="text" className={"form-control"} name="title" placeholder={"Наслов на огласот"}
                                               onChange={e => this.change(e)} value={this.state.title}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Број за контакт</label>
                                        <input type="text" className={"form-control"} name="phone_number" placeholder={"078123456"}
                                               onChange={e => this.change(e)}
                                               value={this.state.phone_number}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Додадете ја цената: </label>
                                        <input type="text" className={"form-control"} name="price" placeholder={"Цена во денари"}
                                               onChange={e => this.change(e)}
                                               value={this.state.price}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Додадете опис на огласот</label>
                                        <textarea name="description" className={"form-control"} placeholder={"Опис за огласот"}
                                                  onChange={e => this.change(e)} value={this.state.description}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Додадете ја вашата локација</label>
                                        <input type="text" name="location" className={"form-control"} placeholder={"Локација"}
                                               onChange={e => this.change(e)} value={this.state.location}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Прикачете слика
                                        </label>
                                        <input type="file" multiple="" onChange={this.changeFile}/>
                                    </div>
                                    <button type="submit" className={"btn btn-primary btn-block"}>Внеси оглас</button>
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

export default CreateAd;



