// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import { reduxForm, Form } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PageWrapper from 'lib/components/layout/wizard';
import * as PageActions from '../modules/actions';

// ==================== import peer dependencies for this component =================
import { StyledPageHeader, WrappedIcon, UserAvatar } from 'lib/components/extend';
import theme from 'config/theme';
import { formatNumber } from 'lib/utils/formatters';
import {
	LargeText,
	SmallText,
	BlockText,
	Divider,
	HorizontalSpacer,
	HorizontalLine,
	ActionMenuList,
	MainWrapper,
	RowSection
} from 'lib/components/snippets';
import { ActionLink } from 'lib/components/nav';
import { GridItem, DashedItem, GridRow } from 'lib/components/grid';
import PropTypes from 'prop-types';

const ActionText = styled.h4`
	padding: .3rem .5rem;
	border: ${(props) => props.theme.constants.border};
	background: ${(props) => props.theme.colors.lightGrey};
	font-size: 0.6rem;
	margin-top: 10px;
`;

const ProtectionWrapper = styled(RowSection)`
	padding: ${(props) => props.theme.constants.secondaryPadding}
`;

const ProtectionBlock = styled.div`
    /* color: ${(props) => props.theme.colors.baseColor}; */
    border: 1px solid ${theme.colors.white};
    padding: .5rem 1rem;
    /* margin: 2px 7px; */
    width: 100%;
    border-radius: 2px;
    min-height: 50px;
    background: ${(props) => props.theme.colors.lightYellow}
`;

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputAmount: '',
			inputUser: ''
		};
	}

	_handleChangeUser = (e) => {
		console.log('THIS IS VALU', e.target.value);
		this.setState({ inputUser: e.target.value });
	};
	_handleChangeAmount = (e) => {
		this.setState({ inputAmount: e.target.value });
	};

	// 	__page__(pin): "review"
	// requires_shipping(pin): false
	// request_type(pin): "send"
	// target(pin): "rotola@sendbox.ng"
	// amount(pin): "8790"
	// item_type_code(pin): null
	// description(pin): "Reforms must take place"
	// quantity(pin): 1
	// amount(pin): 0
	// weight(pin): 0

	render() {
		const { handleSubmit, data, pristine, invalid, submitting } = this.props;
		const shippingText = 'Provide a shipping address here if you require delivery of the Items';
		const avatarFallback = data.target.charAt(0).toUpperCase() || 'A'; // Avatar Letter based on First Name or Email
		const randomAvatarBg = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate Random Avatar background

		return (
			<PageWrapper
				showWizard={true}
				showHeader={false}
				padding={'0px'}
				previousText={'Send'}
				pIconType={'hand'}
				nIconType={'hand'}
				nextText={'Receive'}
				withNextPrevious={true}
				handlePrevClick={() => this.props.navigateToRoute('disclaimer')}
				handleNextClick={handleSubmit}
				loading={submitting}
				disabled={!pristine && invalid}
			>
				<StyledPageHeader
					onBack={() => this.props.navigateToRoute('disclaimer')}
					title="Confirm and Complete"
					margin={'0px'}
					border
					// subTitle="Add Payee Information"
				/>

				{/* =========== Wrapper for Top preview Escrow Request======= */}
				<MainWrapper paddingTop>
					<HorizontalSpacer padding={'4rem'} />
					{/***** Grid Column for user Avatar ******/}
					<RowSection justifyContent={'center'}>
						<UserAvatar avatar={randomAvatarBg}>{avatarFallback}</UserAvatar>
					</RowSection>
					{/* *****Grid Column for User Request Description****** */}

					{/* ==	User request amount for escrow === */}
					<LargeText justifyContent={'center'} color={theme.colors.baseColor} fontSize={'1.8rem'}>
						{`${formatNumber(data.amount || '0')}.00`}
					</LargeText>
					{/* ==== user request email phone preview === */}

					<SmallText justifyContent={'center'} fontSize={'1rem'}>
						{`Send to `}
						{data.target || ''}
					</SmallText>
				</MainWrapper>

				{/* Item Description Section  */}
				<Divider />
				<MainWrapper paddingBottom>
					<SmallText>{data.items[0].description}</SmallText>
				</MainWrapper>

				{/* = Section for UEscrow Protection */}
				<Divider />
				<ProtectionWrapper justifyContent={'flex-end'}>
					<ProtectionBlock onClick={this._handleOrigin}>
						{/* <WrappedIcon type="edit" /> */}
						<h3>Escrow Protection</h3>
						<SmallText>
							The seller pays the fee, and your eligible purchases are covered by our Buyer Protection.
						</SmallText>
					</ProtectionBlock>
				</ProtectionWrapper>
				<Divider />

				{/* = Section for Escrow Protection  */}

				{/* Section Summary if Require Shipping is selected ===== */}
				<MainWrapper paddingBottom>
					<GridRow>
						{/* revert to this code when implementing static Google map images for addresses */}
						{/* <ImageBox src="/static/images/location.svg" margin={'7px 12px 0px 0px'} /> */}
						<GridItem>
							<DashedItem fontSize={'0.7rem'}>SHIPPING</DashedItem>
							<BlockText>{data.origin_name}</BlockText>
							<SmallText>{shippingText}</SmallText>
						</GridItem>
						<ActionText>
							<a onClick={() => this.props.navigateToRoute('origin', 'review')}>ADD</a>
						</ActionText>
					</GridRow>
				</MainWrapper>
				<HorizontalSpacer padding={'.1rem'} />
				{/* ==== Section Summary if Require Shipping is selected ===== */}

				<MainWrapper padding={theme.constants.secondaryPadding} paddingBottom>
					<ActionMenuList border={'0px'}>
						<ActionLink href="#" label={'Add Payment Method'} icon={'credit-card'} />
						{/* <LargeText fontSize={'1rem'}>Add Payment Method</LargeText>
						<WrappedIcon type="right" /> */}
					</ActionMenuList>
				</MainWrapper>
			</PageWrapper>
		);
	}
}

Page.propTypes = {
	navigateToRoute: PropTypes.func,
	handleSubmit: PropTypes.func.isRequired,
	pristine: PropTypes.bool,
	submitting: PropTypes.bool,
	invalid: PropTypes.bool
};

function mapStateToProps(state) {
	return state.pay;
}

const mapDispatchToProps = {
	navigateToRoute: PageActions.navigateToRoute
};

// ============== Wrap Component around Redux Form ========
const NameForm = reduxForm({
	form: 'pay',
	onSubmit: PageActions.requestEscrow,
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
// ============ Wrap Form Around Global Store ============
