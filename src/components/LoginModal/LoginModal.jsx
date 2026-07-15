import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";

const LoginModal = ({
  isOpen,
  onLogin,
  onClose,
  isFormValid,
  setFormValues,
  onSwitchToRegister,
}) => {
  const defaultValues = { email: "", password: "" };
  const { values, errors, handleChange } = useForm(defaultValues);

  // Wrap handleChange to update both local and global state
  const handleInputChange = (e) => {
    handleChange(e); // local state
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value })); // global state in App
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
