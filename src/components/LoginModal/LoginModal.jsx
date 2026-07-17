import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hook/useForm";
import { validateForm } from "../../utils/validation";
const LoginModal = ({ isOpen, onLogin, onClose, onSwitchToRegister }) => {
  const defaultValues = { email: "", password: "" };
  const { values, errors, handleChange, reset } = useForm(defaultValues);
  const isFormValid = validateForm("login", values);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
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
      title="Log in"
      buttonText="Log in"
      extraButton="or Register"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      onExtraButtonClick={onSwitchToRegister}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
