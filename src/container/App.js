import React, {PureComponent} from 'react';
import '../sass/site/_App.scss';
import List from './List';
import data from '../data.json';

class App extends PureComponent {
    render() {
        return (
            <List categoryList={data}/>
        );
    }
}

export default App;
