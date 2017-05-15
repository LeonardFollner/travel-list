import React, {PureComponent} from 'react';
import {$get, $set, $toggle} from 'plow-js';
import uuidV1 from 'uuid';
import data from '../data.json';
import moment from 'moment';
import Cookies from 'js-cookie';

class categoryList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            transport: {
                bike: false,
                car: false,
                caravan: false
            },
            accommodation: {
                tent: false,
                hotel: false,
                caravan: false,
                friends: false
            },
            location: '',
            time: {
                start: '',
                end: ''
            },
            type: {
                business: false,
                instrumental: false,
                vacation: false
            },
            name: '',
            uuid: uuidV1()
        };
    }

    handleSave = () => {
        console.log(this.state);

        // generate list of fields to check against
        const fieldsToCheck = [['type', 'basic']];
        for (const categoryName of Object.keys(this.state)) {
            switch (categoryName) {
                case 'accommodation':
                case 'transportation':
                case 'type':
                    for (const property of Object.keys($get([categoryName], this.state))) {
                        if ($get([categoryName, property], this.state)) {
                            const path = [categoryName, property];
                            fieldsToCheck.push(path);
                        }
                    }
                    break;
                case 'time':
                    const start = moment($get([categoryName, 'start'], this.state));
                    const end = moment($get([categoryName, 'end'], this.state));

                    const startYear = start.year();
                    const endYear = end.year();

                    // start
                    if (start.isAfter(moment().date(20).month(11).year(startYear)) && start.isBefore(moment().date(20).month(2).year(startYear + 1))) {
                        // in winter
                        fieldsToCheck.push(['season', 'winter']);
                    } else if (start.isAfter(moment().date(19).month(2).year(startYear)) && start.isBefore(moment().date(21).month(5).year(startYear))) {
                        // in spring
                        fieldsToCheck.push(['season', 'spring']);
                    } else if (start.isAfter(moment().date(20).month(5).year(startYear)) && start.isBefore(moment().date(22).month(8).year(startYear))) {
                        // in summer
                        fieldsToCheck.push(['season', 'summer']);
                    } else if (start.isAfter(moment().date(21).month(9).year(startYear)) && start.isBefore(moment().date(21).month(11).year(startYear))) {
                        // in autumn
                        fieldsToCheck.push(['season', 'autumn']);
                    }

                    // end
                    if (end.isAfter(moment().date(20).month(11).year(endYear)) && end.isBefore(moment().date(20).month(2).year(endYear + 1))) {
                        // in winter
                        fieldsToCheck.push(['season', 'winter']);
                    } else if (end.isAfter(moment().date(19).month(2).year(endYear)) && end.isBefore(moment().date(21).month(5).year(endYear))) {
                        // in spring
                        fieldsToCheck.push(['season', 'spring']);
                    } else if (end.isAfter(moment().date(20).month(5).year(endYear)) && end.isBefore(moment().date(22).month(8).year(endYear))) {
                        // in summer
                        fieldsToCheck.push(['season', 'summer']);
                    } else if (end.isAfter(moment().date(21).month(9).year(endYear)) && end.isBefore(moment().date(21).month(11).year(endYear))) {
                        // in autumn
                        fieldsToCheck.push(['season', 'autumn']);
                    }
                    break;
                default:
                    break;
            }
        }

        // generate list of items excluded from list
        const allLists = $get(['lists'], data);
        const length = allLists.length;
        const excludedItems = [];
        for (let key = 0; key < length - 1; key++) {
            const items = $get([key, 'items'], allLists);
            const numberOfItems = items.length;
            for (let itemKey = 0; itemKey < numberOfItems - 1; itemKey++) {
                const item = items[itemKey];
                const itemId = $get(['id'], item);
                const itemCategories = $get(['categories'], item);

                let itemExcluded = true;
                for (const pathToCheckAgainst of Object.values(fieldsToCheck)) {
                    if ($get(pathToCheckAgainst, itemCategories) || !itemExcluded) {
                        itemExcluded = false;
                    }
                }
                if (itemExcluded) {
                    excludedItems.push(itemId);
                }
            }
        }
        const cookie = {
            uuid: this.state.uuid,
            name: this.state.name,
            time: this.state.time,
            excluded: excludedItems,
            checked: [],
            notes: []
        };

        const end = moment($get(['time', 'end'], this.state));
        const expires = end.diff(moment(), 'days') + (2 * 365);

        Cookies.set(this.state.uuid, cookie, {expires: expires});
    };

    handleFormToggle = path => {
        return (
            () => {
                this.state = $toggle(path, this.state);
            }
        );
    };

    handleFormChange = path => {
        return (
            event => {
                this.state = $set(path, event.target.value, this.state);
            }
        );
    };

    render() {
        return (
            <div>
                <h2>Create Your Custom Travel-List</h2>
                <div>
                    <h3>How Are You moving?</h3>
                    <form>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['transport', 'bike'])}/> Bike
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['transport', 'car'])}/> Car
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['transport', 'caravan'])}/>
                            Camper
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Where are You going to stay?</h3>
                    <form>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['accommodation', 'tent'])}/> Tent
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['accommodation', 'hotel'])}/> Hostel
                            / Hotel
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['accommodation', 'caravan'])}/>
                            Camper
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['accommodation', 'friends'])}/> with
                            Friends
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Where are You headed?</h3>
                    <form>
                        <label>
                            <input type="text" onChange={this.handleFormChange(['location'])}/>
                        </label>
                    </form>
                </div>
                <div>
                    <h3>When is Your Vacation</h3>
                    <form>
                        <label>
                            start <input type="date" onChange={this.handleFormChange(['time', 'start'])}/>
                        </label>
                        <label>
                            end <input type="date" onChange={this.handleFormChange(['time', 'end'])}/>
                        </label>
                    </form>
                </div>
                <div>
                    <h3>What type of journey are you planning?</h3>
                    <form>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['type', 'business'])}/> business
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['type', 'instrumental'])}/>
                            instrumental
                        </label>
                        <label>
                            <input type="checkbox" onClick={this.handleFormToggle(['type', 'vacation'])}/> vacation
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Name Your travel-list</h3>
                    <form>
                        <label>
                            <input type="text" onChange={this.handleFormChange(['name'])}/>
                        </label>
                    </form>
                </div>
                <button onClick={this.handleSave}>Create List!</button>
            </div>
        );
    }
}

export default categoryList;
