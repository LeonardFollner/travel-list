import React, {PureComponent} from 'react';

class categoryList extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Create Your Custom Travel-List</h2>
                <div>
                    <h3>How Are You moving?</h3>
                    <form>
                        <label>
                            <input type="checkbox"/> Bike
                        </label>
                        <label>
                            <input type="checkbox"/> Car
                        </label>
                        <label>
                            <input type="checkbox"/> Camper
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Where are You going to stay?</h3>
                    <form>
                        <label>
                            <input type="checkbox"/> Tent
                        </label>
                        <label>
                            <input type="checkbox"/> Hostel / Hotel
                        </label>
                        <label>
                            <input type="checkbox"/> Camper
                        </label>
                        <label>
                            <input type="checkbox"/> with Friends
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Where are You headed?</h3>
                    <form>
                        <label>
                            <input type="text"/>
                        </label>
                    </form>
                </div>
                <div>
                    <h3>When is Your Vacation</h3>
                    <form>
                        <label>
                            start <input type="date"/>
                        </label>
                        <label>
                            end <input type="date"/>
                        </label>
                    </form>
                </div>
                <div>
                    <h3>What type of journey are you planning?</h3>
                    <form>
                        <label>
                            <input type="checkbox"/> business
                        </label>
                        <label>
                            <input type="checkbox"/> instrumental
                        </label>
                        <label>
                            <input type="checkbox"/> vacation
                        </label>
                    </form>
                </div>
                <div>
                    <h3>Name Your travel-list</h3>
                    <form>
                        <label>
                            <input type="text"/>
                        </label>
                    </form>
                </div>
                <div>Create List!</div>
            </div>
        );
    }
}

export default categoryList;
