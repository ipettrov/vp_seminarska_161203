import React, {Component} from "react";
import {getJwt} from "../../helpers/jwt";
import axiosService from "../../repository/axiosService";
import {withRouter} from 'react-router-dom';

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        let self = this;
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login')
            // komponentite podobro e da gi grupiras u folderi
        }
        axiosService.getUser(jwt)
            .then(function (response) {
                localStorage.setItem('current_user', JSON.stringify(response.data));
                self.setState({
                    user: response.data
                })
            })
            .catch(err => {
                localStorage.removeItem('current_user');
                localStorage.removeItem('jwt_token');
                this.props.history.push('/login')
            });
    }

    render() {
        if (this.state.user === undefined) {

            return (
                <div>Loading..</div>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        )

    }
}

export default withRouter(Auth);



