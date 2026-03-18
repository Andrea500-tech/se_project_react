import "./ClothesSection.css";
import ItemCard  from "../ItemCard/ItemCard";
export function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          +Add new
        </button>
      </div>
      <ul className="clothes-section__item">
        {clothingItems.filter(Boolean) // removes null/undefined
          .map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}