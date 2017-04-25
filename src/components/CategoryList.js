import React, {PropTypes, PureComponent} from 'react';
import Item from './Item';

class categoryList extends PureComponent {
    static propTypes = {
        categoryList: PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            enabled: PropTypes.bool.isRequired,
            items: PropTypes.array.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            categoryList: props.categoryList
        };
    }

    render() {
        return (
            <tbody>
                <tr>
                    <th>{this.state.categoryList.label}</th>
                </tr>
                {
                    this.state.categoryList.items.map(item => {
                        return (
                            <Item item={item} key={item.label}/>
                        );
                    })
                }
            </tbody>
        );
    }
}

export default categoryList;
