import "./ItemCard.css";
function ItemCard({ item,onCardClick }) {
  const handleItemClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__title-container">
        <h2 className="card__title">{item.name}</h2>
      </div>

      <img src={item.link} alt={item.name} className="card__image" onClick={
        handleItemClick
      }/>
    </li>
  );
}
export default ItemCard;