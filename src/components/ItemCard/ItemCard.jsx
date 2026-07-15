import heartIcon from "../../assets/like-btn/heart.svg";
import likeActiveIcon from "../../assets/like-btn/like-active.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!item) return null;
  const handleItemClick = () => {
    onCardClick(item);
  };
  //  derive isLiked from item.likes
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const handleLike = () => {
    if (!currentUser?._id) return;
    onCardLike({
      _id: item._id,
      isLiked: isLiked,
    });
  };
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;
  return (
    <li className="card">
      <div className="card__title-container">
        <h2 className="card__title">{item.name}</h2>
        {currentUser?._id && (
          <button className={itemLikeButtonClassName} onClick={handleLike}>
            <img
              src={isLiked ? likeActiveIcon : heartIcon}
              alt="like button"
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleItemClick}
      />
    </li>
  );
}
export default ItemCard;
