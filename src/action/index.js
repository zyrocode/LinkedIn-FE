
 
export const loginWithThunk = (token, user) => {
    return async (dispatch, getState) => {
      
      const {loginDetails} = getState()
  
  console.log(loginDetails)

   
   
        dispatch({
            type: "SET_USERBASE64",
            payload: {
              token:token.access_token,
              user:user.user.username
          }
        });
  
  
    
      
    };
  };
  