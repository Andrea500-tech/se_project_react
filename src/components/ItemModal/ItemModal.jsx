import closeIcon from "../../assets/close-icon.svg";
import "./ItemModal.css";
function ItemModal({ activeModal, card, closeActiveModal }) {
  return (
    <div
      className={`modal ${
        activeModal === "preview" ? "modal__open modal__with-image" : ""
      }`}
    >
      <div className="modal__content modal__content-type-image">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image-preview" />
        <div className="modal__footer">
          <h2 className="modal__caption modal__title-type-image">
            {card.name}
          </h2>
          <p className="modal__weather">weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
