import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class AccountsUIWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// Use Meteor Blaze to render login buttons
		this.loginView = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
		console.log(this.loginView);
	}

	componentWillUnmount() {
		// clean up the blaze view
		Blaze.remove(this.loginView);
	}

	render() {
		// Render a placeholder container to be filled in

		return React.createElement(
			'div',
			null,
			React.createElement('span', {
				review: 'item',
				refs: 'container'
			})
		);
	}
}
