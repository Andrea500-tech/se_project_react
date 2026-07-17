import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import { validateForm } from "../../utils/validation";
const RegisterModal = ({ isOpen, onRegister, onClose, onSwitchToLogin }) => {
  const defaultValues = { name: "", email: "", password: "", avatar: "" };
  const { values, errors, handleChange, reset } = useForm(defaultValues);

  const isFormValid = validateForm("register", values); // Validate the form based on the current values
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values); // send data up to App
    reset(); // Reset the form after submission
  }

  // clear whenever modal opens
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      extraButton="or Login"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onExtraButtonClick={onSwitchToLogin}
      isFormValid={isFormValid}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          id="register-email"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          id="register-password"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="register-name">
        Name
        <input
          className="modal__input"
          id="register-name"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL
        <input
          className="modal__input"
          id="register-avatar"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
