import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import WizardFormFirstPage from './MenuItem';
import WizardFormSecondPage from './FoodItem';
import WizardFormThirdPage from './OriginForm';
import WizardFormLastPage from './RecipeForm';

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

	updateState = (key, value) => {
		this.setState({ [key]: value });
	}
	
	onSubmit = () => {
		console.log(this.state);
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
