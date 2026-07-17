import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import MobileMenuOverlay from "../ItemMenu/ItemMenu";
import Main from "../Main/Main";
import { Profile } from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import { getWeather, filterWeatherData } from "../../utils/weather";
import { coordinates, apiKey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  addItem,
  getItems,
  removeItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import { validateForm } from "../../utils/validation";
function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const authenticateUser = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    closeActiveModal();

    auth
      .getUserInfo(token)
      .then(({ _id, name, email, avatar }) => {
        setCurrentUser({ _id, name, email, avatar });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((res) => {
        if (res) {
          //  call helper right after token is returned
          authenticateUser(res.token);
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .signUp({ name, avatar, email, password })
      .then(() => auth.signIn({ email, password }))
      .then((res) => {
        if (res) {
          // call helper right after token is returned
          authenticateUser(res.token);
        }
      })
      .catch(console.error);
  };
  const handleSignOut = () => {
    setIsLoggedIn(false);
    removeToken();
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
    });
  };
  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const handleCardLike = ({ _id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item)),
            );
          })
          .catch(console.error)
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item)),
            );
          })
          .catch(console.error);
  };

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [clothingItems, setClothingItems] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  // Handlers for modals
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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
    const id = card._id;
    removeItem(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        handleConfirmClose();
        closeActiveModal(); // close preview modal too
      })
      .catch(console.error);
  };

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);
  const handleUpdateUser = (updatedUser) => {
    updateUserProfile(updatedUser) // call backend PATCH
      .then((res) => {
        // res should be the updated user object { name, avatar }
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: res.name,
          avatar: res.avatar,
        }));
        closeActiveModal();
      })
      .catch(console.error);
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

  const onAddItem = (inputValues) => {
    const newItem = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
      createdAt: Date.now(),
      owner: currentUser._id,
    };
    addItem(newItem)
      .then((items) => {
        setClothingItems([items, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
        setIsWeatherDataLoaded(true);
      })
      .catch(console.error);

    getItems()
      .then((items) => {
        const sorted = items.sort((a, b) => b._id.localeCompare(a._id));
        setClothingItems(sorted);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .getUserInfo(jwt)
      .then(({ _id, name, email, avatar }) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /profile.
        setIsLoggedIn(true);
        setCurrentUser({ _id, name, email, avatar });
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
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              openMobileMenu={openMobileMenu}
            />

            {isMobileMenuOpened && (
              <MobileMenuOverlay
                closeMobileMenu={closeMobileMenu}
                handleAddClick={handleAddClick}
                toggleSwitch={<ToggleSwitch />}
                handleRegisterClick={handleRegisterClick}
                handleLoginClick={handleLoginClick}
                isLoggedIn={isLoggedIn}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />

          {/* Modals */}
          {isLoggedIn && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {isLoggedIn && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
          )}

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={(values) => {
              // call backend /signin here
              handleLogin(values);
            }}
            onSwitchToRegister={openRegister}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={(values) => {
              // call backend /signup here
              handleRegistration(values);
            }}
            onSwitchToLogin={openLogin}
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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
