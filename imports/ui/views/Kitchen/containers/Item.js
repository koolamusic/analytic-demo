// ==================== import dependencies for this component ================
import React, { Component, Fragment } from 'react';
import { reduxForm, Form, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
	WrappedCol,
	WrappedRow,
	WrappedDropdown,
	WrappedDropdownButton,
	WrappedIcon,
	WrappedMenu
} from 'lib/components/extend';
import PropTypes from 'prop-types';

import {
	BorderedContainer,
	MainWrapper,
	SmallText,
	LargeText,
	HorizontalLine,
	HorizontalSpacer
} from 'lib/components/snippets';
import { AddressCards } from 'lib/components/cards';
import * as PageActions from '../modules/actions';
import * as validators from 'lib/utils/validators';
import { CheckField, TextAreaField, NumberField } from 'lib/components/inputs';
import { DashedItem } from 'lib/components/grid';
// ==================== import dependencies for this component =================

const RequireShipping = styled(CheckField)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const LocationDropdown = styled(WrappedDropdownButton)`
    display: flex;
    flex: 1;

	& .ant-btn:last-child {
		padding-left: 24px!important;
		padding-right: 20px!important;
	}
    & .ant-btn.ant-btn-default:nth-child(1){
        flex: 1;
		width: 200px;
		white-space: nowrap;
		text-overflow: ellipsis;
    }
	& .ant-dropdown-menu {
		padding: 6px 6px;
	}
`;

// ==== React Component =====
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requireShipping: false,
			valuesPresent: false,
			dropdownIcon: 'down',
			placeHolder: ''
		};
	}

	_handleVisibleChange = (flag) => {
		this.setState({ valuesPresent: flag });
	};

	static propTypes = {
		navigateToRoute: PropTypes.func,
		handleNextClick: PropTypes.func,
		handlePrevClick: PropTypes.func,
		handleSubmit: PropTypes.func,
		pristine: PropTypes.bool,
		invalid: PropTypes.bool,
		submitting: PropTypes.bool,
		dependencies: PropTypes.object,
		item_types: PropTypes.array,
		data: PropTypes.object,
		change: PropTypes.func
	};

	// ===== Render Shipping Form is the user is a Sender and Request Type is Send Escrow Payment ====
	_renderShipping = (value) => {
		const { data: { request_type } } = this.props;
		// if (request_type == 'send') {
		this.setState({
			requireShipping: value
		});
		// }
	};

	// =============== Function to manage adding a Destination Address into the FORM for a user sending escrow payment
	_addDestinationAddress = (data) => {
		const { change } = this.props;
		change('destination_name', data.name);
		change('destination_phone', data.phone);
		change('destination_street', data.street);
		change('destination_city', data.city);
		change('destination_state_code', data.state_code);
		change('destination_country_code', data.country_code);

		// Logic to set dropdown visible state, indicate values present and set dropdown placeholder
		this.setState({ valuesPresent: false, placeHolder: data.street, dropdownIcon: 'edit' });
		console.log('I AM ADDING ORIGINS ====>', this.props);
	};

	// ============= generate Fields for Redux Form Fields Array https://redux-form.com/8.1.0/examples/fieldarrays/ ================
	_renderFields = ({ fields }) => {
		if (fields && fields.length == 0) {
			fields.push({
				item_type_code: null,
				description: null,
				quantity: 1,
				amount: 0,
				weight: 0
			});
		}

		// Generate Form Fields
		const formElements = fields.map((item, index, fieldsMap) => (
			<Fragment key={index}>
				<HorizontalSpacer padding={'.2rem'} />
				{/* item_type_code */}
				{/* <SelectField
                    onSearch={value => console.log(value)}
                    options={item_types}
                    type={'text'}
                    validate={validators.isRequired}
                    loading={submitting}
                    placeholder="Item Category"
                    name={`${item}.item_type_code`}
                /> */}
				<HorizontalSpacer padding={'.4rem'} />

				{/* Item Description */}
				<TextAreaField
					name={`${item}.description`}
					validate={validators.isRequired}
					placeholder="Item Description"
					size={'large'}
					type={'text'}
				/>

				<WrappedRow gutter={12}>
					{/* quantity */}
					<WrappedCol span={12}>
						<NumberField
							name={`${item}.quantity`}
							placeholder={'quantity'}
							validate={validators.isRequired}
							style={{ display: 'none' }}
							min={1}
							defaultValue={1}
							type={'text'}
						/>
					</WrappedCol>

					{/* value */}
					<WrappedCol span={12}>
						<NumberField
							validate={validators.isRequired}
							style={{ display: 'none' }}
							name={`${item}.amount`}
							placeholder={'Item Value'}
							min={1}
							type={'text'}
						/>
					</WrappedCol>
				</WrappedRow>
				{/* <WrappedIcon type="delete" onClick={() => fieldsMap.remove(index)} /> */}
			</Fragment>
		));

		return (
			<Fragment>
				{/* // fields.push props available through redux Form to generate new Field Forms https://redux-form.com/8.1.0/docs/api/fieldarray.md/#iteration */}
				{formElements}
			</Fragment>
		);
	};

	render() {
		const { handleSubmit, pristine, invalid, submitting, dependencies: { locations } } = this.props;
		const { requireShipping, valuesPresent, dropdownIcon, placeHolder } = this.state;
		console.log('THISI IS ITEMS STATE', this.state);

		return (
			<Form onSubmit={handleSubmit}>
				{/* ==== Render Fields Array Section for Items Form ==== */}
				<MainWrapper border paddingBottom={'1rem'}>
					<HorizontalSpacer padding={'1rem'} />
					<LargeText fontSize={'1rem'}>Describe Item</LargeText>
					{/* <HorizontalSpacer padding={'3rem'} /> */}
					<HorizontalLine />
					<FieldArray name={'items'} component={this._renderFields} />
				</MainWrapper>
				{/* ==== Render Fields Array Section for Items Form ==== */}

				{/* ==== Bordered container for Escrow Payment that requires shipping ====  */}
				<MainWrapper>
					<HorizontalSpacer padding={'1rem'} />
					<HorizontalSpacer padding={'.3rem'} />
					<BorderedContainer>
						<RequireShipping
							name={'require_shipping'}
							label={'Require Shipping'}
							handleInputChanged={this._renderShipping}
						/>
						{requireShipping && (
							<Fragment>
								<DashedItem float={'right'}>
									<a href="#">Link a new Address</a>
								</DashedItem>
								<SmallText>
									This option allows you to process an escrow request with a shipments allowing you to
									also define an address to dispatch the item which is in escrow
								</SmallText>
							</Fragment>
						)}
					</BorderedContainer>
					<HorizontalSpacer padding={'1rem'} />

					{requireShipping && (
						<Fragment>
							<LocationDropdown
								icon={<WrappedIcon type={dropdownIcon} />}
								placement="bottomLeft"
								visible={valuesPresent}
								onVisibleChange={this._handleVisibleChange}
								overlay={
									<WrappedMenu>
										{locations.map((value, idx) => {
											return (
												<AddressCards
													key={idx}
													obj={value}
													title={`${value.city.name}`}
													desc={value.street}
													handleButton={this._addDestinationAddress}
													button={'Select'}
												/>
											);
										})}
									</WrappedMenu>
								}
							>
								{/* /Logic to render User destination address or location Placeholder retrieved from state  */}
								{(placeHolder !== null && placeHolder !== '') || undefined ? (
									placeHolder
								) : (
									'Select Destination'
								)}
								{/* End Logic */}
							</LocationDropdown>
							<HorizontalSpacer paddingBottom={'4rem'} />
						</Fragment>
					)}
				</MainWrapper>

				{/* ==== Bordered container for Escrow Payment that requires shipping ====  */}
			</Form>
		);
	}
}

function mapStateToProps(state) {
	return state.pay;
}

const mapDispatchToProps = {
	navigateToRoute: PageActions.navigateToRoute
};

// ============== Wrap Component around Redux Form ========
const FormPage = reduxForm({
	form: 'pay',
	// onSubmit: PageActions.requestEscrow,
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
// ============ Wrap Form Around Global Store ============
