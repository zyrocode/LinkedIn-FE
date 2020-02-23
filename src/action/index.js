
 
export const loginWithThunk = (t,u) => {
    return async (dispatch, getState) => {
      
      const {token} = getState()
  
  console.log(token)

   
   
        dispatch({
            type: "SET_USERBASE64",
            payload: {
              token:t,
              user:u
          }
        });
  
  
    
      
    };
  };
  