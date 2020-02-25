export default function (state={}, action) {
    switch(action.type){
        case "SET_USERBASE64":
            return {
                 ...state.details,
                
                 userToken: action.payload.token,
                  username: action.payload.user
            }
        default:
            return state
    }
}