import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducerCreator from '../reducers'

const initState = {
  heros: {
    herosCache: {},
    ids: [],
    isLoading: false,
    isError: false,
    isInit: false,
    selectedHero: '',
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducerCreator(initState),
  initState,
  composeEnhancers(applyMiddleware(thunk))
)

export default store