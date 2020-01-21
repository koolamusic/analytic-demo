// ==================== import dependencies for this component ================
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Col, Input } from 'antd';
import { LargeText } from 'lib/components/snippets';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from './actions';
import NewLocationForm from 'lib/components/addLocationForm';
// ==================== import dependencies for this component =================

class Page extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		handleSubmit: PropTypes.func,
		navigateToRoute: PropTypes.func
	};
	render() {
		const { handleSubmit } = this.props;

		return (
			<Fragment>
				<PageHeader
					onBack={() => this.props.navigateToRoute('destination')}
					title="Book a shipment"
					subTitle="Add Shipping Origin"
				/>
				{/* Embed the New Location Form which can be referenced and triggered from modal */}
				<Col span={18} offset={2}>
					<Form onSubmit={handleSubmit}>
						<NewLocationForm />
					</Form>
				</Col>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return state.ship;
}

const mapDispatchToProps = {
	navigateToRoute: PageActions.navigateToRoute
};

// ============== Wrap Component around Redux Form ========
const LocationsForm = reduxForm({
	form: 'onboarding',
	// onSubmit: PageActions.submitLocationForm,
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(mapStateToProps, mapDispatchToProps)(LocationsForm);
// ============ Wrap Form Around Global Store ============
