import { createStore, combineReducers, compose, applyMiddleware} from "redux"
import reducer from "../reducers"
import thunk from "redux-thunk"


const initialState ={
    details:{
        userToken: "",
        username: ""
    }
}


const combinedReducers = combineReducers({
    details: reducer
  
})
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
    return createStore(combinedReducers, initialState, composeEnhancers(applyMiddleware(thunk)))
}