import React, {PureComponent} from 'react';

class Overview extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>Hello</div>
        );
    }
}

export default Overview;
