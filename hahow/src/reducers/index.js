import actionTypes from '../actions/actionTypes'

const reducers = {
}

export default function createReducers(initState) {
  return function reducer(state = initState, action) {
    if (reducers.hasOwnProperty(action.type)) {
      return reducers[action.type](state, action);
    } else {
      return state;
    }
  };
}