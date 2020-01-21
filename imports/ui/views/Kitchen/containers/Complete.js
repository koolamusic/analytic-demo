// ==================== import dependencies for this component ================
import React, { Component, Fragment } from 'react';
import { HorizontalSpacer } from 'lib/components/snippets';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from '../modules/actions';
import styled from 'styled-components';
import { colors } from 'config/constants';
import PageWrapper from 'lib/components/layout/wizard';
// ==================== import dependencies for this component =================

import {
	Paragraph,
	ImageBox,
	SmallText,
	LargeText,
	IconWrapper,
	RateViewBox,
	headerProps,
	bodyProps
} from 'views/snippets';

class Page extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	openModal = () => {
		this.setState({ open: true });
	};

	state = {
		open: false,
		requestComplete: false,
		paymentData: {}
	};

	_backFunction = () => {
		const { dispatch, data } = this.props;
		PageActions.navigateTo('origin', dispatch, data);
	};

	_cancelFunction = () => {
		const { reset, dispatch } = this.props;
		reset('ship');
		PageActions.navigateTo('origin', dispatch, {});
		window.history.back();
	};

	render() {
		const { handleSubmit, submitting, data: { status, sender_actions, code, target } } = this.props;

		const defaultMessage =
			(status.code && status.code != 'drafted') || (status.code && status.code != 'pending')
				? 'Escrow request successfully drafted'
				: 'Escrow request failed';
		const tick =
			(status.code && status.code != 'drafted') || (status.code && status.code != 'pending')
				? 'success-tick.svg'
				: 'error-tick.svg';
		const summaryMessage =
			(status.code && status.code != 'drafted') || (status.code && status.code != 'pending')
				? 'Your recipient has been notified about your request, chill and ease with some cookie &#127850;'
				: 'Are you experiencing any difficulty in making your request? please contact support or try again';

		return (
			<PageWrapper
				showWizard={true}
				withSubmit={true}
				bgColor={'white'}
				handleWithSubmit={handleSubmit}
				submitText={'Book another request'}
				type="dashed"
				loading={submitting}
				showHeader
				bodyProps={bodyProps}
			>
				<HorizontalSpacer padding={'2rem'} />
				<IconWrapper textAlign={'center'} width={'100%'}>
					<ImageBox width={'64px'} height={'64px'} src={`/static/images/${tick}`} />
				</IconWrapper>
				<HorizontalSpacer padding={'1rem'} />
				<Paragraph
					color={colors.black}
					display={'block'}
					bold
					width={'75%'}
					margin={'0px auto'}
					textAlign={'center'}
				>
					{`${defaultMessage}`}
				</Paragraph>
				<Paragraph fontSize={'0.8rem'} margin={'0.1rem auto'} color={colors.textGrey} textAlign={'center'}>
					{`${summaryMessage}`}
				</Paragraph>
				<HorizontalSpacer padding={'1rem'} />
				{status.code &&
				status.code != 'pending' && (
					<Fragment>
						<RateViewBox>
							{/* <SmallText bold fontSize={'0.75rem'}>
								YOUR TRACKING CODE
							</SmallText> */}
							<LargeText color={colors.neonRed}>{`${code}`}</LargeText>
							<HorizontalSpacer padding={'1rem'} />
							{/* <a href={`https://cloud.sendbox.ng/tracking/${code}`} target="_blank">
								<SmallText bold color={colors.black} fontSize={'0.75rem'}>
									{'TRACK YOUR SHIPMENT'} <Spacer padding={'2px'} />{' '}
									<i style={{ color: colors.neonRed }} className="fa fa-hand-o-right" />
								</SmallText>
							</a> */}
						</RateViewBox>
						<HorizontalSpacer padding={'1rem'} />
						<SmallText bold color={colors.neonRed}>
							FURTHER INSTRUCTIONS
						</SmallText>
						<Paragraph
							fontSize={'0.8rem'}
							margin={'0.1rem auto'}
							color={colors.textGrey}
							textAlign={'center'}
						>
							{/* {`You should receive a phone call from the courier assigned to your pickup when they are close to your pickup location`} */}
							<br />
						</Paragraph>
					</Fragment>
				)}
				<HorizontalSpacer padding={'2rem'} />

				<Form onSubmit={handleSubmit}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						{/* <AuthorizeButton
							borderWidth={'2px'}
							borderColor={colors.lightGrey}
							backgroundColor={'transparent'}
							color={colors.black}
							wide
							type="submit"
						>
							{'Book another request'}
						</AuthorizeButton> */}
					</div>
					<HorizontalSpacer padding={'0.5rem'} />
				</Form>
			</PageWrapper>
		);
	}
}

function mapStateToProps(state) {
	return state.pay;
}

const mapDispatchToProps = {
	navigateToRoute: PageActions.navigateToRoute,
	fetchDependencies: PageActions.fetchDependencies
};

// ============== Wrap Component around Redux Form ========
const FormPage = reduxForm({
	form: 'pay',
	onSubmit: PageActions.resetAndRestart,
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
// ============ Wrap Form Around Global Store ============
