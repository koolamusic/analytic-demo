import React, { Component } from 'react';

import WizardFormFirstPage from './MenuItem';
import WizardFormSecondPage from './FoodItem';
import WizardFormThirdPage from './OriginForm';
import WizardFormLastPage from './RecipeForm';

export default class Kitchen extends Component {
	constructor(props: any) {
		super(props);
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.state = {
			page: 1
		};
	}
	nextPage(e) {
		e.preventDefault()
		this.setState({ page: this.state.page + 1 });
	}

	previousPage() {
		this.setState({ page: this.state.page - 1 });
	}
	onSubmit = () => {
		alert('we did it');
	};

	render() {
		const { page } = this.state;
		const { onSubmit } = this.props
		console.log(this.state, this.props);
		return (
			<div>
				{page === 1 && <WizardFormFirstPage handleSubmit={this.nextPage} />}
				{page === 2 && <WizardFormSecondPage handlePrevious={this.previousPage} handleSubmit={this.nextPage} />}
				{page === 3 && <WizardFormThirdPage handlePrevious={this.previousPage} handleSubmit={this.onSubmit} />}
			</div>

		);
	}
}
