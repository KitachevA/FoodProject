import tabs from "./modules/tabs";
import modalWindow from "./modules/modalWindow";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slides from "./modules/slides";
import { openModal } from "./modules/modalWindow";

window.addEventListener("DOMContentLoaded", ()=>{
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId ), 5000); 
tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
modalWindow('[data-modal]','.modal',modalTimerId);
timer('.timer','2023-06-11');
cards();
calc();
forms('form',modalTimerId);
slides({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow:'.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'

});

});
