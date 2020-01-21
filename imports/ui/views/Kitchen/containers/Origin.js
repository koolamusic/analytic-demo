// ==================== import dependencies for this component ================
import React, { Component, Fragment } from 'react';
import { reduxForm, Form } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PageWrapper from 'lib/components/layout/wizard';
import Items from './Item';
import * as PageActions from '../modules/actions';
import * as validators from 'lib/utils/validators';

// ==================== import peer dependencies for this component =================
import { StyledPageHeader, WrappedIcon, WrappedButton } from 'lib/components/extend';
import theme from 'config/theme';
import { formatNumber } from 'lib/utils/formatters';
import {
	LargeText,
	SmallText,
	DarkWrapper,
	RowSection,
	BorderedContainer,
	HorizontalSpacer,
	HorizontalLine,
	Divider,
	MainWrapper
} from 'lib/components/snippets';
import { InputField } from 'lib/components/inputs';
import PropTypes from 'prop-types';

const InputContainer = styled(BorderedContainer)`
    padding: 1.7rem 1rem 2rem 1rem;
    margin-top: -3rem;
    background: white;
    z-index: 1000;
`;

const EditBlock = styled.div`
    /* color: ${(props) => props.theme.colors.baseColor}; */
    border: 1px solid ${theme.colors.white};
    padding: 3px 7px;
    margin: 2px 7px;
    border-radius: 4px;
    position: absolute;
    bottom: .5rem;
`;

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputAmount: '',
			inputUser: '',
			originPresent: false,
			canEdit: null,
			requireShipping: false
		};
	}

	static propTypes = {
		navigateToRoute: PropTypes.func,
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool,
		submitting: PropTypes.bool,
		invalid: PropTypes.bool
	};

	_handleChangeUser = (e) => {
		this.setState({ inputUser: e.target.value });
	};
	_handleChangeAmount = (e) => {
		this.setState({ inputAmount: e.target.value });
	};

	_handleOrigin = () => {
		this.setState({
			originPresent: !this.state.originPresent,
			canEdit: true
		});
	};

	render() {
		const { handleSubmit, pristine, invalid, submitting } = this.props;
		const { inputAmount, inputUser, canEdit, originPresent } = this.state;
		console.log('THISI IS POUR STATE', this.state);

		return (
			<PageWrapper
				showWizard={true}
				showHeader={false}
				padding={'0px'}
				// bgColor={'white'}
				withNextPrevious={true}
				handlePrevClick={() => this.props.navigateToRoute('disclaimer')}
				handleNextClick={handleSubmit}
				loading={submitting}
				disabled={!pristine && invalid}
			>
				<StyledPageHeader
					onBack={() => this.props.navigateToRoute('disclaimer')}
					title="Request Escrow"
					margin={'0px'}
					border
					// subTitle="Add Payee Information"
				/>
				{/* ===============Wrapper for Top preview in origin ============= */}
				<DarkWrapper paddingTop>
					<HorizontalSpacer padding={'2rem'} />
					{/* ==	User input amount for escrow === */}
					{inputUser && (
						<LargeText justifyContent={'center'} fontSize={'1.6rem'}>
							{`${formatNumber(inputAmount || '0')}.00`}
						</LargeText>
					)}
					{/* ==== user input email phone preview === */}
					<SmallText justifyContent={'center'} fontSize={'1rem'}>
						{inputUser ? ` to ${inputUser}` : 'who are you sending to ?'}
					</SmallText>
					{/* = Section to allow user Edit Origin Information  */}
					{originPresent && (
						<RowSection justifyContent={'flex-end'}>
							<EditBlock onClick={this._handleOrigin}>
								<WrappedIcon type="edit" />
								Edit
							</EditBlock>
						</RowSection>
					)}
				</DarkWrapper>
				{/*  Section to allow user Edit Origin Information= */}
				{/* ============== Wrapper for Top preview in origin ============ */}

				{/* ===============Wrapper for Origin Form Target & Amount ============= */}
				{!originPresent && (
					<MainWrapper bgColor={theme.colors.greyBg} paddingBottom={'10px'}>
						<Form onSubmit={handleSubmit}>
							<InputContainer>
								<LargeText fontSize={'1rem'}>Who is the recipient</LargeText>
								<HorizontalSpacer padding={'3rem'} />
								<HorizontalLine />
								<HorizontalSpacer padding={'1.5rem'} />
								{/* == Add The User to Request Escrow == */}
								<InputField
									name={'target'}
									type={'text'}
									placeholder={'Enter email or phone .'}
									onKeyUp={this._handleChangeUser}
									validate={validators.isRequired}
									prefix={'plus-square'}
								/>
								<HorizontalSpacer padding={'.5rem'} />
								{/* == Add The Amount the user request for == */}
								<InputField
									name={'amount'}
									placeholder={'How much are you sending ?'}
									onKeyUp={this._handleChangeAmount}
									validate={validators.isNumeric}
									prefix={'credit-card'}
									type={'tel'}
								/>

								<HorizontalSpacer padding={'1rem'} />

								{/* === Button for user Origin Add ===== */}
								<WrappedButton
									disabled={!pristine && invalid}
									block
									type="primary"
									onClick={this._handleOrigin}
								>
									{canEdit ? `Save` : `Proceed`}
								</WrappedButton>
							</InputContainer>
						</Form>
					</MainWrapper>
				)}
				{/* ===============Wrapper for Origin Form Target & Amount ============= */}

				{/* === Render the Items description component here ===  */}

				{(originPresent || canEdit) && (
					<Fragment>
						<Divider />
						<Items />
					</Fragment>
				)}
				{/* === Render the Items description component here ===  */}
			</PageWrapper>
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
const NameForm = reduxForm({
	form: 'pay',
	onSubmit: PageActions.submitOrigin,
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
// ============ Wrap Form Around Global Store ============
