import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import { useContext, useEffect } from "react";
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
    name: currentUser?.name ?? "",
    avatar: currentUser?.avatar ?? "",
  };

  const { values, errors, handleChange, reset } = useForm(defaultValues);

  // Sync form values when modal opens or currentUser changes
  useEffect(() => {
    if (isOpen && currentUser) {
      reset({
        name: currentUser.name ?? "",
        avatar: currentUser.avatar ?? "",
      });
    }
  }, [isOpen, currentUser, reset]);

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
      <label className="modal__label" htmlFor="edit-name">
        Name
        <input
          className="modal__input"
          id="edit-name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="edit-avatar">
        Avatar
        <input
          className="modal__input"
          id="edit-avatar"
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
