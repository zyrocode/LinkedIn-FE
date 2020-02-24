const RefreshAPI = async (access_token) => {
  try {
    const response = await fetch(
      "http://app-be.azurewebsites.net/users/refresh",
      {
        headers: {
          Authorization: "Bearer " + access_token
        },
        method: "POST"
      }
    );

    if (response.ok) return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default RefreshAPI;
