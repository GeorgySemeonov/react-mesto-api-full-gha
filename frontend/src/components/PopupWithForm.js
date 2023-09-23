import React from "react";
import closeIcon from "../images/close-Icon.svg";

function PopupWithForm(props) {
  return (
    <div
      id={props.id}
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>

        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__forms"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button popup__button_active">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
