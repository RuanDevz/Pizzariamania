import React, { useState, useEffect, useContext } from 'react';
import { ContainerHeader } from './HeaderStyle';
import logo from '../../assets/logo.png';
import { LuMenu } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Logincontext from '../../context/Logincontext';
import Input from '../Inputs/Input';
import { FaRegUser } from "react-icons/fa";



const Header = () => {
  const [menuactive, setMenuactive] = useState(true);
  const navigate = useNavigate();
  const {setModalvisible} = useContext(Logincontext)

  const showMenu = () => {
    setMenuactive((prevMenuActive) => !prevMenuActive);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuactive(true);
      } else {
        setMenuactive(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const Openmodal = () =>{
    setModalvisible((prevModalActive) => !prevModalActive)
  }

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
              <div>
                
              </div>
              <div onClick={Openmodal} className='options'>
              <FaShoppingCart />
              </div>
              <div id='user'>
                <FaRegUser />
              </div>
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
