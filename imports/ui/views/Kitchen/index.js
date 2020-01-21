/*
  VIEW: Payments
  ROUTE: /accounts/payments
  DEPENDENCY/FILES : *containers *modules *redux *lib/components
  DESC: Manage the Flow for the process of a user requesting an escrow payment
  */

// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PageActions from './modules/actions';

import PageSpinner, { DottedSpinner, ScaleSpinner } from 'lib/components/spinners';
import { loadingBodyProps } from 'lib/components/snippets';
import PropTypes from 'prop-types';
import theme from 'config/theme';

import Disclaimer from './containers/Disclaimer';
import Origin from './containers/Origin';
import Items from './containers/Item';
import Review from './containers/Review';
import Complete from './containers/Complete';
import Checkout from './containers/Checkout';
import Error from './containers/Error';

class Page extends Component {
	componentDidMount() {
		this.props.fetchDependencies({
			__page__: 'disclaimer',
			requires_shipping: false
		});
	}

	render() {
		const { isLoaded, isReloaded, data: { __page__ } } = this.props;

		if (!isLoaded || !isReloaded) {
			return (
				<PageSpinner showHeader bodyProps={loadingBodyProps}>
					<ScaleSpinner size={'la-3x'} style={{ color: theme.colors.baseColor }} />
				</PageSpinner>
			);
		}

		let PageComponent = null;

		switch (__page__) {
			case 'disclaimer':
				PageComponent = Disclaimer;
				break;
			case 'origin':
				PageComponent = Origin;
				break;
			case 'items':
				PageComponent = Items;
				break;
			case 'review':
				PageComponent = Review;
				break;
			case 'checkout':
				PageComponent = Checkout;
				break;
			case 'complete':
				PageComponent = Complete;
				break;
			case 'error':
				PageComponent = Error;
				break;
			default:
				break;
		}

		if (!PageComponent) {
			return (
				<PageSpinner showHeader={true} bodyProps={loadingBodyProps}>
					<DottedSpinner size={'large'} />
				</PageSpinner>
			);
		}
		return <PageComponent {...this.props} />;
	}
}

Page.propTypes = {
	fetchDependencies: PropTypes.func,
	isReloaded: PropTypes.bool,
	isLoaded: PropTypes.bool,
	data: PropTypes.object
};

function mapStateToProps(state) {
	return state.pay;
}

const mapDispatchToProps = {
	fetchDependencies: PageActions.fetchDependencies
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
