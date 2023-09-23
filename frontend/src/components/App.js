import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import likeIcon from "../images/like-icon.svg";
import trashIcon from "../images/trash-icon.svg";

import Header from "./Header.js";
import Main from "./Main";
import { Footer } from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import apiAuth from "../utils/ApiAuth";

import "../index.css";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getDataProfile(), api.getInitialCards()])
      .then(([userItem, initialCards]) => {
        setCurrentUser(userItem);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка, ${err}`);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth
        .tokenVerification(jwt)
        .then((res) => {
          //setEmail(res.data.email);
          //console.log(res.data.email)
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка верификации токена, ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleCardDelete(card) {
    api
      .deliteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки, ${err}`);
      });
    //  console.log(card._id)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка лайка, ${err}`);
      });
  }

  function handleCardClick(item) {
    setImagePopupOpen(true);
    setSelectedCard({
      link: item.link,
      name: item.name,
    });
  }

  function handleUpdateUser(userItem) {
    api
      .setUserInfo(userItem)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования профиля, ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((userItem) => {
        setCurrentUser(userItem);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка редактирования аватара, ${error}`)
      );
  }

  function handleAddPlaceSubmit(userItem) {
    api
      .addNewCard(userItem)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка добавления карточки, ${error}`));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setTooltipOpen(false);
  }

  // регистрация пользователя
  function handleRegister(password, email) {
    apiAuth
      .userRegistration(password, email)
      .then(() => {
        setTooltipOpen(true);
        setStatus(true);
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя, ${err}`);
        setTooltipOpen(true);
        setStatus(false);
      });
  }
  // авторизация пользователя
  function handleLogin(password, email) {
    apiAuth
      .userAuthorization(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setEmail(email);
          setIsLoggedIn(true);

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации, ${err}`);
        setTooltipOpen(true);
        setStatus(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} email={email} isLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                isOpen={tooltipOpen}
                onClose={closeAllPopups}
                status={status}
              ></Login>
            }
          />

          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                isOpen={tooltipOpen}
                onClose={closeAllPopups}
                status={status}
              ></Register>
            }
          />
        </Routes>

        <Footer />

        {/* попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* попап редактирования информации профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* попап редактирования добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        {/* попап успешной или неуспешной регистрации */}
        <InfoTooltip
          isOpen={tooltipOpen}
          onClose={closeAllPopups}
          status={status}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
