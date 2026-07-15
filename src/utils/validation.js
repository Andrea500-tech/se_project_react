// src/utils/validation.js
import validator from "validator";

export const isNonEmpty = (val, min = 1) => val && val.trim().length >= min;
export const isValidEmail = (val) => val && validator.isEmail(val);
export const isValidUrl = (val) =>
  val &&
  validator.isURL(val, {
    require_protocol: true,
    require_host: true,
    protocols: ["http", "https"],
  });
export const isStrongPassword = (val) => val && val.trim().length >= 6;

// Field-level validation with messages
export const validateField = (name, value) => {
  switch (name) {
    case "name":
      return isNonEmpty(value) ? "" : "Name cannot be empty";
    case "email":
      return isValidEmail(value) ? "" : "Invalid email address";
    case "avatar":
    case "imageUrl":
      return isValidUrl(value) ? "" : "Invalid URL";
    case "password":
      return isStrongPassword(value)
        ? ""
        : "Password must be at least 6 characters";
    case "weather":
      return value !== "" ? "" : "Please select a weather type";
    default:
      return "";
  }
};

// Form-level validation 
export const validateForm = (activeModal, formValues) => {
  switch (activeModal) {
    case "edit-profile":
      return isNonEmpty(formValues.name) && isValidUrl(formValues.avatar);
    case "add-garment":
      return (
        isNonEmpty(formValues.name) &&
        isValidUrl(formValues.imageUrl) &&
        formValues.weather !== ""
      );
    case "register":
      return (
        isNonEmpty(formValues.name) &&
        isValidEmail(formValues.email) &&
        isValidUrl(formValues.avatar) &&
        isStrongPassword(formValues.password)
      );
    case "login":
      return (
        isValidEmail(formValues.email) && isStrongPassword(formValues.password)
      );
    default:
      return false;
  }
};
