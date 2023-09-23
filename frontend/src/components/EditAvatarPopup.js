import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const userAvatarRef = useRef();

  useEffect(() => {
    userAvatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(
      userAvatarRef.current.value,
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      id="avatarPopup"
      title="Обновить аватар"
    >
      <input
        id="avatar-input"
        type="url"
        className="popup__form "
        name="avatar"
        ref={userAvatarRef}
        required
        placeholder="Введите ссылку на аватар"
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error popup__input-error_type_avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
