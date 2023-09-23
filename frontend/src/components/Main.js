import React, { useContext } from "react";
import api from "../utils/Api";

import CurrentUserContext from "../contexts/CurrentUserContext";

import editProfileIcon from "../images/edit-profile-icon.svg";
import createProfileIcon from "../images/create-profile-icon.svg";

import Card from "./Card";

function Main(props) {
  const profInfo = useContext(CurrentUserContext);

  return (
    <main>
      <div className="profile">
        <div className="profile__avatar">
          <img src={profInfo.avatar} className="profile__photo" alt="Аватар" />
          <button
            type="button"
            onClick={props.onEditAvatar}
            className="profile__avatar-edit"
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{`${profInfo.name}`}</h1>
          <button
            type="button"
            onClick={props.onEditProfile}
            className="profile__edit"
          >
            <img
              src={editProfileIcon}
              className="profile__edit-icon"
              alt="Редактировать"
            />
          </button>
          <p className="profile__subtitle"> {`${profInfo.about}`}</p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
        >
          <img
            src={createProfileIcon}
            className="profile__add-button-icon"
            alt="Создать"
          />
        </button>
      </div>

      <div className="elements__list">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>

      <div className="elements"></div>
    </main>
  );
}

export default Main;
