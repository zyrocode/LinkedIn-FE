import { createStore, combineReducers, compose, applyMiddleware} from "redux"
import reducer from "../reducers"
import thunk from "redux-thunk"


const storageState =  localStorage.getItem("access_token");
const sessionState =  sessionStorage.getItem("access_token");

const userStorage =  localStorage.getItem("username");
const userSession =  sessionStorage.getItem("username");

let initialState ={
    details:{
        userToken: "",
        username: ""
    },
    
}


if(storageState || sessionState){
    initialState = {
        details:{
            userToken: (storageState || sessionState),
            username: (userStorage || userSession)
        }
    }
}




/*
let initState = {}
const persistedState = localStorage.getItem('reduxState')
if (persistedState) {
  initState = JSON.parse(persistedState)
}

let store = createStore(
  combineReducers({
    tasks: tasksReducer,
  }),
  initState
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
*/
const combinedReducers = combineReducers({
    details: reducer
  
})


// const setStorageToken =  localStorage.setItem("access_token", JSON.stringify(getState().details.userToken));
// const setSessionToken =  sessionStorage.setItem("access_token", JSON.stringify(getState().details.userToken));

// const setUserLocal =  localStorage.setItem("username",JSON.stringify(getState().details.username));
// const setUserSession =  sessionStorage.setItem("username",JSON.stringify(getState().details.username));

// export const storSubscribe =()=>{
// return store.subscribe(() => {
//        setStorageToken || setSessionToken,
//        setUserLocal || setUserSession
//      })

// }



// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore=()=> {
    return createStore(combinedReducers, initialState, composeEnhancers(applyMiddleware(thunk)))
}

