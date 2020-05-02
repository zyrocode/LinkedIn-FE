export default  (state={}, action) => {
    switch(action.type){
        case "SET_IMG":
            return {
                 ...state,
                
                 img: action.payload.imageUrl
            }
        default:
            return state
    }
}