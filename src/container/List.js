import React, {PureComponent, PropTypes} from 'react';
import CategoryList from '../components/CategoryList';

class categoryList extends PureComponent {
    static propTypes = {
        categoryList: PropTypes.shape({
            label: PropTypes.string.isRequired,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            id: PropTypes.number.isRequired,
            lists: PropTypes.array.isRequired
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
            <div>
                <h1>{this.state.categoryList.label}</h1>
                <div>
                    <table>
                        <tr>
                            <th>start</th>
                            <td>{this.state.categoryList.start}</td>
                        </tr>
                        <tr>
                            <th>end</th>
                            <td>{this.state.categoryList.end}</td>
                        </tr>
                        <tr>
                            <th>to</th>
                            <td>{this.state.categoryList.location}</td>
                        </tr>
                    </table>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>packed?</th>
                            <th>Notes</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    {this.state.categoryList.lists.map((categoryList, index) => {
                        return (
                            <CategoryList categoryList={categoryList} key={index}/>
                        );
                    })}
                </table>
            </div>
        );
    }
}

export default categoryList;
