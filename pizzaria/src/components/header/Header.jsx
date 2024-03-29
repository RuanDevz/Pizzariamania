import React, { useState } from 'react';
import { ContainerHeader } from './HeaderStyle';
import logo from '../../assets/logo.png';
import { LuMenu } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import {Link} from 'react-router-dom'

const Header = () => {
  const [menuactive, setMenuactive] = useState(false);

  const showMenu = () => {
    setMenuactive((prevMenuActive) => !prevMenuActive);
  };

  return (
    <ContainerHeader>
      <div className='logo'>
        <img src={logo} alt='logo' />
        <Link to='/'><h1>Mania</h1></Link>
      </div>
      <div className='menu'>
        {menuactive ? (
          <>
            <IoMdClose className='menubar' onClick={showMenu} />
            <ul className='menuoptions'>
              <li>Home</li>
              <li>Login</li>
              <li>Register</li>
            </ul>
          </>
        ) : (
          <LuMenu className='menubar' onClick={showMenu} />
        )}
      </div>
    </ContainerHeader>
  );
};

export default Header;
