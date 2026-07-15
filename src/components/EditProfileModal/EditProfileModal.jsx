import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const EditProfileModal = ({
  isOpen,
  onClose,
  onUpdateUser,
  isFormValid,
  setFormValues,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser.name,
    avatar: currentUser.avatar,
  };

  const { values, errors, handleChange } = useForm(defaultValues);

  // Wrap handleChange to update both local and global state
  const handleInputChange = (e) => {
    handleChange(e); // local state + errors
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value })); // global state in App
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save changes"
      name="edit-profile"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="avatar">
        Avatar
        <input
          className="modal__input"
          id="avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleInputChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};
