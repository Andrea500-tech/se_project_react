import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import MobileMenuOverlay from "../../ItemMenu/ItemMenu.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weather";
import {
  coordinates,
  apikey,
  defaultClothingItems,
} from "../../utils/constants";
function App() {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // State for clothing items
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  function openMobileMenu() {
    setIsMobileMenuOpened(true);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpened(false);
  }
  useEffect(() => {
    // Fetch weather data based on coordinates
    getWeather(coordinates,apikey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          openMobileMenu={openMobileMenu}
        />
        {isMobileMenuOpened && (
          <MobileMenuOverlay
            closeMobileMenu={closeMobileMenu}
            handleAddClick={handleAddClick}
          />
        )}

        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
        />
      </div>
      <Footer />
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        name="add-garment"
        onClose={closeActiveModal}
      >
        <label className="modal__label" htmlFor="name">
          Name
          <input
            className="modal__input"
            id="name"
            type="text"
            placeholder="Name"
          />
        </label>
        <label className="" htmlFor="imageURL">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label modal__label_type_radio" htmlFor="hot">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
              value="hot"
            />
            <span>Hot</span>
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="warm"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
              value="warm"
            />
            <span>Warm</span>
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="cold"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
              value="cold"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
