import React, {PureComponent} from 'react';
import '../sass/site/_App.scss';
import ListBuilder from '../components/ListBuilder';
import {Route, Router} from 'react-router';
import Overview from './Overview';
import List from './List';

class App extends PureComponent {
    render() {
        return (
            <Router>
                <Route path="/" component={Overview}/>
                <Route path="/new" component={ListBuilder}/>
                <Route path="/list/:uuid" component={List}/>
            </Router>
        )
            ;
    }
}

export default App;
