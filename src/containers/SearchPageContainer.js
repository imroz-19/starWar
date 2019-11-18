import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import SearchPage from '../components/searchPage';
import {store} from '../index';
import { setPlanetList, showNoPlanetFound, showLoader } from '../actions/index';
import { browserHistory } from 'react-router';


const mapStateToProps = (state) => {
    let planetList = state.planets.list;
    let showNoResultError = state.planets.showNoResultError;
    let showLoader = state.login.showLoader;

    return {
        planetList: planetList,
        showNoResultError: showNoResultError,
        showLoader
    }
};

const mapDispatchToProps = (dispatch) => {

    const planetSearch = _.debounce((item)=> {search(item)}, 1000);

    const submitHandler = (e) => {
        e.preventDefault();
        let state = store.getState();
        let searchText = state.form.searchForm && state.form.searchForm.values && state.form.searchForm.values.query;
        search(searchText);
    };
    const search = async (text) => {
        let planetList = [];
        let count = 1;
        let request;
        let response;
        dispatch(showNoPlanetFound(false));
        dispatch(showLoader(true));
        if (text) {
            try {
                while (count<=7) {
                    request = await axios({
                        url: `https://swapi.co/api/planets/?page=${count++}`
                    });
                    response = request.data;
                    if (!response.next) {
                        break;
                    }
                    response.results.forEach((item)=> {
                        if (item.name.toLowerCase().includes(text.toLowerCase())) {
                            planetList.push(item);
                        }
                    });
                }
                dispatch(showLoader(false));
                if (planetList.length < 1) {
                    dispatch(showNoPlanetFound(true));
                }
                dispatch(setPlanetList(planetList));
            } catch (e) {
                console.log(e)
            }

        }

    };
    
    const logout = () => {
        window.sessionStorage.removeItem('password');
        browserHistory.push('/');
    }

    return {
        planetSearch,
        submitHandler,
        logout
    }
};

class SearchPageContainer extends Component {

    render() {
        return (
            <SearchPage {...this.props}/>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);