export default function (state={}, action) {
    switch(action.type){
        case "SET_USERBASE64":
            return {
                 ...state,
                
                 userToken: action.payload.token,
                  username: action.payload.user
            }
            case "SET_IMG":
            return {
                 ...state,
                
                 img: action.payload.imageUrl
            }
        default:
            return state
    }
}