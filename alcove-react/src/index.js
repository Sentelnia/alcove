import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));


////////////MENU BURGER//////////////////////

let menuBurger = document.querySelector('#burger');
let closeMenu = document.querySelectorAll('.closeMenu');
let menu = document.querySelector('#menu');


if(menuBurger){
  menuBurger.addEventListener('click', ()=>{
    menu.classList.toggle('show-menu');
  })
}

if(closeMenu){
  closeMenu.forEach((el) =>{
    el.addEventListener('click', ()=>{
      menu.classList.remove('show-menu');
    })
  })
}





///////////////CAROUSSEL//////////////
