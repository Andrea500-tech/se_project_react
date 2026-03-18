import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/close-icon.svg";
export function ConfirmDeleteModal({ closeActiveModal, onConfirm,isOpen }) {
  return (
    <div
      className={`modal ${isOpen === true ? "modal__open modal__with-delete" : ""}`}
    >
      <div className="modal__content modal__content-type-delete">
        <button
          className="modal__close modal__close--delete"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <p className="modal__delete-text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__delete-buttons">
          <button
            className="modal__delete-button modal__delete-button--confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__delete-button modal__delete-button--cancel"
            onClick={closeActiveModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
