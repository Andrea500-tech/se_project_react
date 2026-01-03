import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";
function ModalWithForm({ children, buttonText, title, isOpen, name, onClose }) {
  return (
    <div
      className={`modal ${
        isOpen ? "modal__open modal__with-form" : ""
      } modal_type_${name}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
