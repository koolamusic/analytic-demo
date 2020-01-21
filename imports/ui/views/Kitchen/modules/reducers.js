import { ActionTypes } from './actions';
import { generateReducer } from 'lib/utils/generators';
import * as Reducers from 'lib/utils/reducers';

export default generateReducer(Reducers.defaultState, {
    [ActionTypes.PAY_LOADING]: Reducers.showLoading,
    [ActionTypes.PAY_RELOADING]: Reducers.showReloading,
    [ActionTypes.PAY_FORM_SUCCESSFUL]: Reducers.formSuccessful,
    [ActionTypes.PAY_LIST_SUCCESSFUL]: Reducers.listSuccessful,
    [ActionTypes.PAY_SAVE_SUCCESSFUL]: Reducers.saveSuccessful,
    [ActionTypes.PAY_SAVE_FAILED]: Reducers.saveFailed,
});
