import { getToken } from "./token";
const baseUrl = "http://localhost:3001";
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

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => { 
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
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
