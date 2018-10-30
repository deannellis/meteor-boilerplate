import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';

export class DashboardPage extends React.Component {
    componentWillMount() {
        if (!Meteor.userId()) {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div>
                <PrivateHeader title={"Meteor Boilerplate"}/>
                <div className="page-content">
                    Dashboard page content
                </div>
            </div>
        );
    }
}

export default withRouter(DashboardPage);