import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from "./HomeComponent/Home";
import Auth from "./AuthComponent/Auth";
import Login from "./LoginComponent/Login";
import Ad from "./AdComponent/Ad";
import Register from "./RegisterComponent/Register";
import CreateAd from "./CreateAdComponent/CreateAd";
import Ads from "./AdsListComponent/AdsList";
import AdPreview from "./AdPreviewComponent/AdPreview";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/create_ad' exact component={CreateAd}/>
                <Route path='/ad'  component={AdPreview}/>
                <Auth>
                    <Route path='/ads' exact component={Ads}/>
                </Auth>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
