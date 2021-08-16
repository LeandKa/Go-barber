import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composer = compose(applyMiddleware(...middlewares));
const store = createStore(rootReducer, composer);

sagaMiddleware.run(rootSaga);

export default store;
