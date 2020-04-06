import axios from 'axios'

const axiosService = {

    initData: () =>{
        return axios.get('http://localhost:8080/')
    },

    getUser: (token) => {
        return axios.get('http://localhost:8080/user', {headers: {Authorization: 'Bearer ' + token}});
    },

    authenticate: (username, pass) => {
        return axios.post("http://localhost:8080/authenticate", {
            username: username,
            password: pass
        })
    },

    register: (name, email, username, password) => {
        return axios.post('http://localhost:8080/register', {
            email: email,
            password: password,
            username: username,
            name: name
        })
    },

    create_ad: (title, phone, desc,location,selected_file,price, token) => {
        if (selected_file == null){
            selected_file = "";
        }
        const data = new FormData();
        data.append("title",title);
        data.append("phoneNumber",phone);
        data.append("description",desc);
        data.append("price",price);
        data.append("location",location);
        data.append("image",selected_file);

        return axios('http://localhost:8080/create_ad', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            data,
        })
    },

    ads: () => {
        return axios.get("http://localhost:8080/ads");
    },

};

export default axiosService;






