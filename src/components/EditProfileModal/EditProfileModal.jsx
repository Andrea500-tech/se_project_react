import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { validateForm } from "../../utils/validation";
export const EditProfileModal = ({
  isOpen,
  onClose,
  onUpdateUser,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const defaultValues = {
    name: currentUser?.name ?? "",
    avatar: currentUser?.avatar ?? "",
  };

  const { values, errors, handleChange, reset } = useForm(defaultValues);
  const isFormValid = validateForm("edit-profile", values);

  // Sync form values when modal opens or currentUser changes
  useEffect(() => {
    if (isOpen && currentUser) {
      reset({
        name: currentUser.name ?? "",
        avatar: currentUser.avatar ?? "",
      });
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
    reset(); // Reset the form after submission
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};
