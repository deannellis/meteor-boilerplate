import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    componentWillMount() {
        if (Meteor.userId()) {
            this.props.history.replace('/links');
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        Meteor.loginWithPassword({email}, password, (err) => {
            if(err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Log In</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="email" />
                        <input type="password" ref="password" name="password" placeholder="password" />
                        <button className="button">Log In</button>
                    </form>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        );
    }
}