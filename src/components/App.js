import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SearchPageContainer from '../containers/SearchPageContainer';
import LoginContainer from '../containers/LoginContainer';

const App = () => {
    return (
        <Router history={browserHistory}>
            <div>
                <Route exact path='/' component={LoginContainer} />
                <Route exact path='/SearchPage' component={SearchPageContainer} />
            </div>
        </Router>
    );
}

export default App;
