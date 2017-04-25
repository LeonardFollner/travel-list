import React, {PureComponent} from 'react';
import '../sass/site/_App.scss';
import List from './List';
import data from '../data.json';
import ListBuilder from '../components/ListBuilder';

class App extends PureComponent {
    render() {
        return (
            <div>
                <h1>Travel List</h1>
                <ListBuilder/>
                <List categoryList={data}/>
            </div>
        );
    }
}

export default App;
