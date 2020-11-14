import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

// Esto nos ayuda a poner mas de 1 middleware
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});

// applyMiddleware(thunk) - nos ayuda a trabajar con acciones asincronas

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
