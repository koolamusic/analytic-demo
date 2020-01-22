import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import WizardFormFirstPage from './MenuItem';
import WizardFormSecondPage from './FoodItem';
import WizardFormThirdPage from './OriginForm';
import WizardFormLastPage from './RecipeForm';
import * as Analytics from '/imports/ui/analytics'

export default class Kitchen extends Component {
	constructor(props: any) {
		super(props);
		this.state = {
			menu: '',
			food: '',
			nutrition: '',
			country: '',
			recipe: '',
		}
	}

	updateState = (key: string, value: string) => {
		this.setState({ [key]: value });
	}

	onSubmit = async () => {
		console.log(this.state);
		await Analytics.track('Submit Food Menu', this.state);
		alert('Thank you')
		window.location.replace('/kitchen')
	};

	render() {
		return (
			<Switch>
				<Route path="/kitchen" exact><WizardFormFirstPage updateState={this.updateState} /></Route>
				<Route path="/kitchen/food" exact><WizardFormSecondPage updateState={this.updateState} /></Route>
				<Route path="/kitchen/country" exact><WizardFormThirdPage updateState={this.updateState} /></Route>
				<Route path="/kitchen/recipe" exact><WizardFormLastPage updateState={this.updateState} onSubmit={this.onSubmit} /></Route>
			</Switch>
		);
	}
}
