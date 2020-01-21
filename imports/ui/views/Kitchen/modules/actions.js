import { generateActionTypes, generateAction } from 'lib/utils/generators';
import { errorMessage, errorNotification } from 'lib/utils/errors';
import axios from 'axios';
import Auth from 'lib/auth';
import { Profile, Location, PaymentOption, Card, ItemType, RequestEscrow } from 'config/models';
import { reset, SubmissionError } from 'redux-form';

// ========================================= GENERATE REDUCER ============================ ===============
export const ActionTypes = generateActionTypes('PAY', [ 'LIST', 'SORT', 'FORM', 'DETAIL', 'SAVE' ]);
// =========================== ============== GENERATE REDUCER ============================ ===============

// Stack Navigation to handle back Button within View Elements =====================================
export function navigateToRoute(page, returnPath = '', data) {
	console.log('NAVIGATE > ROUTE PAGE', page, 'THIS IS RETURN PATH >', returnPath, 'THIS IS DATA >>', data);
	return function(dispatch) {
		navigateTo(page, dispatch, data, returnPath);
	};
}

// =================================================================================================

export function navigateTo(page = 'disclaimer', dispatch, data = {}, returnPath) {
	console.log('here is data >', data, 'AND RETURNPAth', returnPath);
	data['__page__'] = page;
	data['__returnTo__'] = returnPath;
	dispatch(generateAction(ActionTypes.PAY_SAVE_SUCCESSFUL, data));
}

// =================================================================================================

export function resetAndRestart(data, dispatch, props) {
	console.log('ccsxx RESET ====', props);
	const { reset } = props;
	reset('ship');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(navigateTo('disclaimer', dispatch, {}));
		}, 250);
	});
}

export function routeOrigin(data, dispatch) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(navigateTo('origin', dispatch, data));
		}, 250);
	});
}

export function submitOrigin(data, dispatch) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(navigateTo('review', dispatch, data));
		}, 250);
	});
}

export function submitReviewPage(data, dispatch) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(navigateTo('checkout', dispatch, data));
		}, 250);
	});
}

export function submitCheckout(data, dispatch) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(navigateTo('disclaimer', dispatch, data));
		}, 250);
	});
}

export function fetchDependencies(data) {
	return function(dispatch) {
		if (data.reloading) {
			dispatch(generateAction(ActionTypes.PAY_FORM_RELOADING, {}));
		} else {
			dispatch(generateAction(ActionTypes.PAY_FORM_LOADING, {}));
		}

		axios
			.all([
				Profile.get(), // Origin countries
				// Country.list({
				//     // page_by: JSON.stringify({ per_page: 1000 }),
				//     // sort_by: JSON.stringify({ asc_desc: "asc", order_by: "name" }),
				//     // filter_by: JSON.stringify({ enabled: { $eq: true } }),
				//     // from_cache: true,
				// }),
				Location.list({ data }),
				PaymentOption.list({
					page_by: JSON.stringify({
						per_page: 1000
					}),
					// from_cache: true,
					sort_by: JSON.stringify({
						asc_desc: 'desc',
						order_by: 'name'
					})
				}),
				ItemType.list({
					page_by: JSON.stringify({
						per_page: 1000
					}),
					sort_by: JSON.stringify({
						asc_desc: 'asc',
						order_by: 'date_created'
					})
				}),
				Card.list({})
			])
			.then(
				axios.spread(function(profile, locations, payment_options, item_types, cards) {
					let dependencies = {
						profile: profile.data,
						locations: locations.data.results,
						payment_options: payment_options.data.results,
						item_types: item_types.data.results,
						cards: cards.data.cards
						// origins: origins.data.results,
						// destinations: destinations.data.results,
						// vehicle_types: vehicle_types.data.results,
					};

					let payload = { data, dependencies };
					dispatch(generateAction(ActionTypes.PAY_FORM_SUCCESSFUL, payload));
				})
			)
			.catch((error) => {
				dispatch(generateAction(ActionTypes.PAY_FORM_FAILED, error.response.data));
			});
	};
}

// ============== Request Escrow API Helper ==========================
export function requestEscrow(data, dispatch) {
	data.currency_code = 'NGN';

	const items = data['items'] || [];
	data.amount += items.reduce((v, i) => {
		return parseFloat(i.amount || '0.0') + v;
	}, 0);

	console.log('%c ======?>>> DATA', 'color: #ff0000', data);

	RequestEscrow.save(data)
		.then((response) => {
			if (response.status == 200 || response.status == 201) {
				navigateTo('complete', dispatch, response.data);
				console.log('%c here REVIEW REQUEST===========>', 'color: #7fff00', response);
			} else {
				navigateTo('complete', dispatch, response.data);
			}
		})
		.catch((error) => {
			if (error.response.status == 409 || error.response.status == 401) {
				throw new SubmissionError(error.response.data);
			} else {
				dispatch(generateAction(ActionTypes.PAY_SAVE_FAILED, error.response.data));
				errorMessage(error.response.data);
			}
		});
}

// =================== buffer Loading ============
export function bufferLoading(data) {
	return function(dispatch) {
		if (data.reloading) {
			dispatch(generateAction(ActionTypes.PAY_RELOADING, {}));
		} else {
			dispatch(generateAction(ActionTypes.PAY_LOADING, {}));
		}
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(navigateTo('disclaimer', dispatch, {}));
			}, 250);
		});
	};
}
