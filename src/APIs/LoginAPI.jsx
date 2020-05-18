const LoginAPI = async (loginObject) => {
  try {
    const resp = await fetch("https://be-lnk.herokuapp.com/users/signin", {
      body: JSON.stringify(loginObject),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (resp.ok) 
    return await resp.json();

  } catch (error) {
    console.log(error);
  }
};

export default LoginAPI