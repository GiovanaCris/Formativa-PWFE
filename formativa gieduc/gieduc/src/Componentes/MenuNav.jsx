import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import estilo from './MenuNav.module.css';
import iconeMenu from '../assets/menu.png';

export function MenuNav() {
  const [mostrarCaixa, setMostrarCaixa] = useState(false);

  function toggleCaixa() {
    setMostrarCaixa(prev => !prev);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={toggleCaixa} style={{ cursor: 'pointer' }}>
        <img src={iconeMenu} className={estilo.navicone} alt="menu" />
      </div>

      {mostrarCaixa && (
        <nav className={estilo.caixa_menu}>
          <ul>
            <li>
              <Link to="home" className={estilo.navs}>Home</Link>
            </li>
            <li>
              <Link to="login" className={estilo.navs}>Login</Link>
            </li>
            <li>
              <Link to="sobre_nos" className={estilo.navs}>Sobre nós</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default MenuNav;