const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
const signUp = ({name, avatar, email, password}) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};
const signIn = ({email, password}) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers:headers,
    body: JSON.stringify({ email, password })
  }).then(handleServerResponse);
};
// getUserInfo accepts the token as an argument.
 const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
export default { signUp, signIn, getUserInfo}