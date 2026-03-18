import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import MobileMenuOverlay from "../ItemMenu/ItemMenu";
import Main from "../Main/Main";
import { Profile } from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weather";
import { coordinates, apikey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, getItems,removeItem } from "../../utils/api";
function App() {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999, c: 999 },
    city: "",
    condition: "",
    isDayTime: true,
  });
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // State for clothing items
  const [clothingItems, setClothingItems] = useState([]);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const onConfirm = () => {
    handleDeleteItem(selectedCard);
    setIsConfirmOpen(false);
    closeActiveModal();
  };
  const handleConfirmOpen = () => {
    setIsConfirmOpen(true);
    closeActiveModal();
  };
   const handleConfirmClose = () => {
     setIsConfirmOpen(false);
   };

   const handleDeleteItem = (card) => {
     const id = card.id;
     removeItem(id)
       .then(() => {
         setClothingItems(
           clothingItems.filter((item) => item.id !== id),
         );
         handleConfirmClose();
         setActiveModal(""); // close preview modal too
       })
       .catch(console.error);
   };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleClickOutside = (e) => {
      // if the click target *is* the overlay, close
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };
    
        

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]); // watch activeModal here
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
  const onAddItem = (inputValues) => {
    const newItem = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
      createdAt: Date.now(),
    };
    addItem(newItem)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  useEffect(() => {
    // Fetch weather data based on coordinates
    getWeather(coordinates, apikey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
        setIsWeatherDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
    getItems()
      .then((data) => {
        const sorted = data.sort((a, b) => b.id - a.id);

        setClothingItems(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        isWeatherDataLoaded,
      }}
    >
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
              toggleSwitch={<ToggleSwitch />}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  setClothingItems={setClothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
        </div>
        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          isOpen={isConfirmOpen}
          onConfirm={onConfirm}
          handleConfirmOpen={handleConfirmOpen}
          handleConfirmClose={handleConfirmClose}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
