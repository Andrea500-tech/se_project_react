import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";
function ModalWithForm({
  children,
  buttonText,
  extraButton,
  title,
  isOpen,
  name,
  onClose,
  onSubmit,
  isFormValid,
}) {
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
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              style={{ background: isFormValid ? "#000" : "#0000004D" }}
              className="modal__submit"
              type="submit"
            >
              {buttonText}
            </button>
            <button className="modal__extrabutton">{extraButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
