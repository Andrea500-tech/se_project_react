import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";

const RegisterModal = ({ isOpen, onRegister, onClose, isFormValid, setFormValues }) => {
  const defaultValues = { name: "", email: "", password: "", avatar: "" };
  const { values, errors, handleChange } = useForm(defaultValues);

  // Wrap handleChange to update both local and global state
  const handleInputChange = (e) => {
    handleChange(e); // local state
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value })); // global state in App
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values); // send data up to App
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      extraButton="or Login"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label" htmlFor="email">
        Email
        <input
          className="modal__input"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label" htmlFor="password">
        Password
        <input
          className="modal__input"
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="avatar">
        Avatar URL
        <input
          className="modal__input"
          id="avatar"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleInputChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
