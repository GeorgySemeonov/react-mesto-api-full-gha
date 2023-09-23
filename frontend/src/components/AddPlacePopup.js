import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const cardTitle = useRef();
  const cardImage = useRef();

  useEffect(() => {
    cardTitle.current.value = "";
    cardImage.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: cardTitle.current.value,
      link: cardImage.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      id="cardPopup"
      title="Новое место"
      name="popupFormsCard"
      buttonText="Создать"
    >
      <input
        required
        id="nameCard"
        className="popup__form "
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={cardTitle}
      />

      <span className="popup__input-error popup__input-error_type_name"></span>

      <input
        required
        id="imageLink"
        className="popup__form"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        ref={cardImage}
      />

      <span className="popup__input-error popup__input-error_type_link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
