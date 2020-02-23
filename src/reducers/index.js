export default function (state={}, action) {
    switch(action.type){
        case "SET_USERBASE64":
            return {
                ...state.details,
           
                 userToken: action.payload.user,
                  username: action.payload.token
            }
        default:
            return state
    }
}