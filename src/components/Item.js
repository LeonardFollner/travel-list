import React, {PureComponent, PropTypes} from 'react';

class item extends PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            enabled: PropTypes.bool.isRequired,
            quantity: PropTypes.number.isRequired,
            notes: PropTypes.string.isRequired
        }).isRequired,
        notes: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            label: props.item.label,
            id: props.item.id,
            checked: props.item.checked,
            enabled: props.item.checked,
            quantity: props.item.quantity,
            notes: props.item.notes
        };
    }

    render() {
        return (
            <tr className="item">
                <td/>
                <td>{this.state.label}</td>
                <td><input type="number" defaultValue={this.state.quantity}/></td>
                <td><input type="checkbox" defaultChecked={this.state.checked}/></td>
                <td><input type="text" defaultValue={this.state.notes}/></td>
                <td><button>remove</button></td>
            </tr>
        );
    }
}

export default item;
