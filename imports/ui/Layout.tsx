import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';

interface IMain {
    username: string
    currentUser?: any;
    [key: string]: any

}

export default class MainPage extends Component<{}, IMain>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: ''
        };
    }

    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);
        let loggedIn = (currentUser && userDataAvailable);
        return (
            <div>
                <div className="container">
                    <h1 className="text-center">
                        {loggedIn ? 'Welcome ' + currentUser.username : ''}
                    </h1>
                </div>
            </div>
        );
    }
}



