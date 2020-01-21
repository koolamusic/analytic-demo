import { Component } from 'react';

import WizardFormFirstPage from './MenuItem';
import WizardFormSecondPage from './FoodItem';
import WizardFormThirdPage from './OriginForm';
import WizardFormLastPage from './RecipeForm';

export default class WizardForm extends Component {
	constructor(props: any) {
		super(props);
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.state = {
			page: 1
		};
	}
	nextPage() {
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
		return (
			<div>
				{page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
				{page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}
				{page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={this.onSubmit} />}
			</div>

		);
	}
}
