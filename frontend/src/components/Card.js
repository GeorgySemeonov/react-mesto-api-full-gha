import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import likeIcon from "../images/like-icon.svg";
import trashIcon from "../images/trash-icon.svg";

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const profInfo = useContext(CurrentUserContext);

  const isOwn = card.owner === profInfo._id;
  //console.log(profInfo._id);

  const isLiked = card.likes.some((item) => item === profInfo._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? " element__like-icon_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div id="cardTamplate" className="elements__tamplate">
      <li className="element">
        <img
          onClick={handleClick}
          className="element__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-field">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          >
            <img src={likeIcon} className="element__like-icon" alt="Лайк" />
          </button>
          <div className="element__like-count">
            {card.likes.length > 0 ? card.likes.length : null}
          </div>
        </div>
        {isOwn && (
          <button
            type="button"
            className="element__delite-button"
            onClick={handleDeleteClick}
          >
            <img
              src={trashIcon}
              className="element__delite-icon"
              alt="Удалить"
            />
          </button>
        )}
      </li>
    </div>
  );
};
export default Card;
