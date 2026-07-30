import { getToken } from "./token";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.migombewtwr.strangled.net"
    : "http://localhost:3001";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, //  add token here
  };
};

export const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    console.error("Server error:", err); // log the actual error
    return Promise.reject(err);
  });
};

export const getItems = () => { 
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  const payload = { name, imageUrl, weather };
  console.log("Payload to POST /items:", payload); 
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};
export const removeItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handleServerResponse);
};
export const updateUserProfile = ({ name, avatar }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(handleServerResponse);
};
export const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
