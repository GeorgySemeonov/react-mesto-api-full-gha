import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import headerLogo from "../images/header-logo.svg";

function Header (props) {

  return (
    <div className="header">
      <img src={headerLogo} className="header__logo" alt="Место" />
    
      <div className="header__member-area">
        { props.isLoggedIn ? ( // пользователь авторизован
          <>
            <p className="header__menu-item">{ props.email }</p>
            <Link to='/sign-in' className="header__menu-item" onClick={ props.isLogout }>Выйти</Link>
          </>
        ) : ( // пользователь не авторизован
          <Routes>
            
            <Route path='/sign-up' element={<Link to='/sign-in' className="header__menu-item">Войти</Link>}/>
            
            <Route path='/sign-in' element={<Link to='/sign-up' className="header__menu-item">Регистрация</Link>}/>
          
          </Routes>
        )}
      </div>
    
    </div>
  );
};

export default Header;