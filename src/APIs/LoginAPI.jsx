const LoginAPI = async (loginObject) => {
  try {
    const resp = await fetch("http://app-be.azurewebsites.net/users/signin", {
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