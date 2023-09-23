import React, { useState } from 'react';

function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail (e) { setEmail(e.target.value) }
  function handlePass (e) { setPassword(e.target.value) }
 
  function handleSubmitButton (e) {
    e.preventDefault();
    props.handleLogin(password, email);
    setPassword('');
    setEmail('');
  }

  return (
    <>
      <div className="auth">
        <h3 className="auth__title-form">Вход</h3>
        <form className="auth__form" onSubmit={ handleSubmitButton }>
          <label className="auth__label">
            <input id="email-input" type="email" onChange={ handleEmail } value={ email || '' } className="auth__input"
                   name="email" required placeholder="Email" minLength="8" maxLength="40" autoComplete="on" />
            <span className="email-input-error auth__input-error" />
          </label>
          <label className="auth__label">
            <input id="pass-input" type="password" onChange={ handlePass } value={ password || '' } className="auth__input"
                   name="pass" required placeholder="Пароль" minLength="6" maxLength="18" autoComplete="on" />
            <span className="passwd-input-error auth__input-error" />
          </label>
          <button type="submit" className="auth__button" aria-label="Войти">Войти</button>
        </form>
      </div>
    </>
  )
}

export default Login;