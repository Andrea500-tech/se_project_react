import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/useForm";
import "./AddItemModal.css";
const AddItemModal = ({
  isOpen,
  onAddItem,
  onClose,
  isFormValid,
  setFormValues,
}) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, errors, handleChange } = useForm(defaultValues);

  // Wrap handleChange so it updates both local and global state
  const handleInputChange = (e) => {
    handleChange(e); // updates local `values`
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value })); // updates App's `formValues`
  };
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
      <label className="modal__label" htmlFor="imageURL">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
