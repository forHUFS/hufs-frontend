import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
// import item, { itemSaga } from '../_actions/reviewPost_action';
import review from './review_reducer';
import loading from '../_actions/loading_action';
const rootReducer = combineReducers({
  review,
  loading,
});

export default rootReducer;
