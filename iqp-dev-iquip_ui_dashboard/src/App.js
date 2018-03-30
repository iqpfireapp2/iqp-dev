import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

// Views
import LoginForm from './iqpcomponents/Auth/LoginForm';
import Login from './views/Pages/Login/';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';

// Containers
import Full from './containers/Full/'

class App extends Component {
    render() {
        return (
            <Switch>
              <Route exact path="/LoginForm" name="LoginForm" component={LoginForm}/>
              <Route exact path="/login" name="Login Page" component={Login}/>
              <Route exact path="/register" name="Register Page" component={Register}/>
              <Route exact path="/404" name="Page 404" component={Page404}/>
              <Route exact path="/500" name="Page 500" component={Page500}/>
              <Route path="/" name="Home" component={Full}/>
            </Switch>
        );
    }
}

export default App;
