import closeIcon from "../../assets/close-icon.svg";
import "./ItemModal.css";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function ItemModal({ activeModal, card, closeActiveModal, isOpen, onConfirm,handleConfirmOpen,handleConfirmClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
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
        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image-preview"
        />
        <div className="modal__footer">
          <div className="modal__caption">
            <h2 className="modal__caption-title modal__caption-title--image">
              {card.name}
            </h2>
            {isOwn && (
            <button
              type="button"
              className="modal__caption-button"
              onClick={handleConfirmOpen}
            >
              Delete item
            </button>
            )}
          </div>
          <p className="modal__caption-weather">weather: {card.weather}</p>
        </div>
      </div>
      {/* Inline confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        closeActiveModal={handleConfirmClose}
      />
    </div>
  );
}
export default ItemModal;
