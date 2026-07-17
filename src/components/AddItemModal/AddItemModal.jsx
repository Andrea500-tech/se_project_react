import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import "./AddItemModal.css";
import { validateForm } from "../../utils/validation";
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, errors, handleChange, reset } = useForm(defaultValues);
  const isFormValid = validateForm("add-garment", values);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
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
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label" htmlFor="add-name">
        Name
        <input
          className="modal__input"
          id="add-name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label" htmlFor="add-imageURL">
        Image
        <input
          type="url"
          className="modal__input"
          id="add-imageURL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label
          className="modal__label modal__label_type_radio"
          htmlFor="add-hot"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-hot"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>

        <label
          className="modal__label modal__label_type_radio"
          htmlFor="add-warm"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-warm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>

        <label
          className="modal__label modal__label_type_radio"
          htmlFor="add-cold"
        >
          <input
            type="radio"
            className="modal__radio-input"
            id="add-cold"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
