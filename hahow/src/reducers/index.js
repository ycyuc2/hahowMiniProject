import actionTypes from '../actions/actionTypes'

const reducers = {
  [actionTypes.getHerosStart]: function (state, action) {
    return getHerosStart(state, action)
  },
  [actionTypes.getHerosError]: function (state, action) {
    return getHerosError(state, action)
  },
  [actionTypes.getHerosSuccess]: function (state, action) {
    return getHerosSuccess(state, action)
  },
}

const getHerosError = (state, action) => {
  const {
    heros
  } = state
  const new_heros = Object.assign({}, heros, {
    isLoading: false,
    isError: true
  })
  return Object.assign({}, state, {
    heros: new_heros
  })
}


const getHerosStart = (state, action) => {
  const {
    heros
  } = state
  const new_heros = Object.assign({}, heros, {
    isLoading: true,
    isError: false
  })
  return Object.assign({}, state, {
    heros: new_heros
  })
}

const getHerosSuccess = (state, action) => {
  const {
    heros
  } = state
  const {
    herosCache,
    ids
  } = action.payload
  const new_heros = Object.assign({}, heros, {
    herosCache,
    ids,
    isLoading: false,
    isError: false,
    isInit: true,
  })

  return Object.assign({}, state, {
    heros: new_heros
  })
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