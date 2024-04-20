/* eslint-disable react/no-children-prop */
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { DashboardContainer, Product } from './dashboardStyle';
import Button from '../../components/button/Button';
import Logincontext from '../../context/Logincontext';
import Cart from '../../components/Cart/Cart';
import Header from '../../components/header/Header';

const Dashboard = () => {
  const { setOrder, Order, username, setIsadmin,isadmin, setCartitems, modalvisible, setModalvisible, cartitems } = useContext(Logincontext);

  useEffect(() => {
    axios.get("https://pizzariamania3.onrender.com/order").then((response) => {
      setOrder(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('https://pizzariamania3.onrender.com/user/login',{
      isAdmin: isadmin
    })
  }, []);

const addToCart = (item) => {
  const existingItem = cartitems.find(cartItem => cartItem.Product === item.Product);

  if (existingItem) {
    if (existingItem.quantity) {
      setCartitems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.Product === item.Product ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      return;
    }
  } else {

    setCartitems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
  }
  
  if (!modalvisible) {
    setModalvisible(true);
  }
};


  return (
    <div>
      {isadmin ? (
        <h1>Você é admin</h1>
      ):(
        <>
      <Header />
      <DashboardContainer>
        <Cart />
        <h1>Bem vindo a Pizzaria Mania, <span id='name'>{username}</span>!</h1>
        <h1>Mais pedidos</h1>
        <Product>
          {Order.map((order) => (
            <div className='Product-item' key={order.id}>
              <h1>{order.Product}</h1>
              <p>{order.Description}</p>
              <img src={order.Img} alt={order.id} />
              <p id='price'>Preço: R${order.Price},00</p>
              <Button onClick={() => addToCart(order)} children='Comprar' />
            </div>
          ))}
        </Product>
      </DashboardContainer>
        </>
      )}
    </div>
  );
};

export default Dashboard;
