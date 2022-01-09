import { createStore, combineReducers } from 'redux';
import pageReducer from '../reducers/pageReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers(
    
    { pageList: pageReducer }
);
const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
         );
}
export default configureStore;