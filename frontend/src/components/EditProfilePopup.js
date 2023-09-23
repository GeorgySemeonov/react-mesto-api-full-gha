import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [isOpen]);

  const [name, setUserName] = useState("");
  const [description, setUserDescription] = useState("");

  function handleName(e) {
    setUserName(e.target.value);
  }

  function handleDescription(e) {
    setUserDescription(e.target.value);
  }

  function handleSubmit(e) {
   e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      id="profilePopup"
      title="Редактировать профиль"
      name="popupForms"
    >
      <input
        required
        id="userNameForm"
        className="popup__form"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        onChange={handleName}
        value={name || ""}
      />

      <span className="popup__input-error popup__input-error_type_name"></span>

      <input
        required
        id="userOccupationForm"
        className="popup__form"
        type="text"
        name="about"
        placeholder="Должность"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescription}
      />

      <span className="popup__input-error popup__input-error_type_about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
