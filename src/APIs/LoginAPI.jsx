const LoginAPI = async (loginObject) => {
  try {
    const resp = await fetch("http://localhost:7000/users/signin", {
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