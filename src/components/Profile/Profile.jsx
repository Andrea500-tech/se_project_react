import "./Profile.css";
import { ClothesSection } from "../ClothesSection/ClothesSection";
import { SideBar } from "../SideBar/SideBar";
export function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleSignOut,
  onCardLike
}) {
  return (
    <section className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOut={handleSignOut}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
