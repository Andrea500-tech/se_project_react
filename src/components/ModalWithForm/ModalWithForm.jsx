import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garmet" && "modal__open modal__with-form"
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button "
          onClick={closeActiveModal}
        >
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
