import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import "./AddItemModal.css";
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defualtValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const {values, handleChange} = useForm(defualtValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          onChange={handleChange}
        />
      </label>
      <label className="" htmlFor="imageURL">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio" htmlFor="hot">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="warm">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="cold">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
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
