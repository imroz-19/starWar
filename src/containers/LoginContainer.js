import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import axios from 'axios';
import Login from '../components/login';
import {store} from '../index';
import {loggedInUser, showLoader, showErrorMsg} from '../actions/index';

const checkValidUser = (validUsers, name, pass) => {
    for (var item in validUsers) {
        if (validUsers[item].name.toLowerCase() === name.toLowerCase() && validUsers[item].pass === pass) {
            return true;
        }
    }
    return false;
};

const mapStateToProps = (state) => {
    let isloggedIn = state.login.loggedInUser;
    let showLoader = state.login.showLoader;
    let showError = state.login.showError;

    return {
        isloggedIn: isloggedIn,
        showLoader: showLoader,
        showError: showError,
    }
};

const mapDispatchToProps = (dispatch) => {

    const login = async (e) => {

        e.preventDefault();
        let state = store.getState();
        dispatch(showErrorMsg(false));
        dispatch(showLoader(true));
        let validUsers = await getUserDetails();
        let userInfo = state.form.loginForm && state.form.loginForm.values;
        let name = userInfo.username;
        let pass = userInfo.pwd;
        if (checkValidUser(validUsers, name, pass)) {
            const passwordObject = { name, pass };
            window.sessionStorage.setItem('password', JSON.stringify(passwordObject));
            browserHistory.push('/SearchPage');
        } else {
            dispatch(showErrorMsg(true))
        }
        dispatch(showLoader(false));

    };


    const getUserDetails = async () => {
        let validUsers = [];
        let count = 1;
        let request;
        let response;
        while(count<=2){
            request = await axios({
                url: `https://swapi.co/api/people/?page=${count++}`
            });
            response = request.data;
            if (!response.next) {
                break;
            }
            response.results.forEach((item)=> {
                validUsers.push({name: item.name, pass: item.birth_year})
            });
        }
        return validUsers;
    };

    return {
        login: login,
    }
};

class LoginContainer extends Component {

    render() {
        return (
            <Login {...this.props} />
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);