/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    
    const result = document.querySelector('.calculating__result span'); 
    let sex , height, age, ratio , weight;

    if(localStorage.getItem('sex')){
        sex =localStorage.getItem('sex');
    } else{
        sex ='famele';
        localStorage.setItem('sex', 'famele');
    }
    if(localStorage.getItem('ratio')){
        ratio =localStorage.getItem('ratio');
    } else{
        ratio =1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSetting(selector, activClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activClass);
            if(elem.getAttribute('id')===localStorage.getItem('sex')){
                elem.classList.add(activClass);
            }
            if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                elem.classList.add(activClass);
            }
        });
    }

    initLocalSetting('#gender div', 'calculating__choose-item_active' );
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active' );


 
    function calcTotal(){
        if(!sex || !height || !age || !ratio || !weight){
            result.textContent='Ошибка';
            console.log(sex, height, age, ratio, weight);
            return;
        }

        
        if(sex==='famele'){
            result.textContent = Math.round(( 447.6 + (9.2*weight) + (3.1*height) - (4.3*age))*ratio);
        } else{
            result.textContent = Math.round((88.36 + (13.4*weight ) + (4.8 *height) - (5.7 *age))*ratio);
        }
    }
    

    calcTotal();

    function getStaticInfarmation(selector,activClass){

        const elements =document.querySelectorAll(selector); 

        elements.forEach(elem=>{
            elem.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){ 
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio')); 
                } else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
            
                elements.forEach(elem=>{
                    elem.classList.remove(activClass);
                });
                e.target.classList.add(activClass); 
                calcTotal();
            });
        });
        
    }
    getStaticInfarmation("#gender div","calculating__choose-item_active");
    getStaticInfarmation(".calculating__choose_big div","calculating__choose-item_active");
    
 
    function getDinamicInformation(selector){
        const inputx = document.querySelector(selector);
        inputx.addEventListener('input',()=>{
            if(inputx.value.match(/\D/g)){
                inputx.style.border ='1px solid red';
            } else{
                inputx.style.border ="none";
            }

            switch(inputx.getAttribute('id')){
                case "height":
                    height= +inputx.value;
                    break;
                case "weight":
                    weight = +inputx.value;
                    break;
                case "age":
                    age = +inputx.value;
                    break;
            }   
            calcTotal();
        });
        
        
    }
    getDinamicInformation("#height");
    getDinamicInformation("#weight");
    getDinamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
   
    class MenuCard{
        constructor(img, alt, title, textBody, price, parentElement, ...classes){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.textBody = textBody;
            this.price = price;
            this.parentElement =document.querySelector(parentElement);
            this.classes = classes;
            this.transform = 27;
            this.transforfToUAH();
    
        }
        
        transforfToUAH(){
            this.price = this.transform * this.price;
        }
    
        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = "menu__item";
                element.classList.add(this.element);
            } else{
                this.classes.forEach(clasName => element.classList.add(clasName));
            }
            
            element.innerHTML =`
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.textBody}
            </div>
            <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
             </div>
            `;
            this.parentElement.append(element);
        }
        
    }
    
  
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResuorse)('http://localhost:3000/menu')
    .then(data =>{
            
            data.sort((a,b)=>{return a.price - b.price;}).forEach(({img, altimg, title, descr, price}) =>{
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
            
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector,modalTimerId){
   
    const forms = document.querySelectorAll(formSelector); 
const massage ={
    loading : "img/spinner.svg",
    suqsses : "Все прошло успешно! Скоро мы с вами свяжемся",
    error : "ОШИБКА!"
};

forms.forEach(elem =>{
    bindPostData(elem);
});



function bindPostData(form){
    form.addEventListener('submit', (event)=>{ 
        event.preventDefault(); 

        const statusMessage = document.createElement('img'); 
        statusMessage.src = massage.loading;
        statusMessage.style.cssText = ` 
              display: block;
              margin: 0 auto   
      `;
      form.insertAdjacentElement('afterend', statusMessage);

     
        const formData = new FormData(form); 
        
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
        
        
          (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
          .then(data=>{ 
              console.log(data); 
              showModalThanks(massage.suqsses);
              statusMessage.remove();
          }).catch(()=>{
              showModalThanks(massage.error);
          }).finally(()=>{
              form.reset(); 
          });
    });
}


    function showModalThanks(massage){
        const prewModalDialog = document.querySelector('.modal__dialog');
        prewModalDialog.classList.add('hide'); 
        (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal',modalTimerId); 

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class ="modal__content">
            <div class = "modal__close" data-close>×</div>
            <div class ="modal__title">${massage}</div>
            </div>
        `;
       document.querySelector('.modal').append(thanksModal);
       setTimeout(()=>{
            thanksModal.remove(); 
            prewModalDialog.classList.add('show'); 
            prewModalDialog.classList.remove('hide');
            (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); 
       }, 4000);
    }
    

    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function openModal(modalSelector, modalTimerId){
  const modalWindw = document.querySelector(modalSelector);
  modalWindw.classList.add('show');
  modalWindw.classList.remove('hide');
  document.body.style.overflow = 'hidden'; 
  console.log(modalTimerId);
  if(modalTimerId){
  clearInterval(modalTimerId);
  } 
}

function closeModal(modalSelector){
    const modalWindw = document.querySelector(modalSelector);
    modalWindw.classList.add('hide');
    modalWindw.classList.remove('show');
    document.body.style.overflow = ''; 
}
//----------------------
function modalWindow(triggerSelector, modalSelector, modalTimerId){
    
    const btnModal = document.querySelectorAll(triggerSelector),
          modalWindw = document.querySelector(modalSelector);
       

   btnModal.forEach(btn =>{
        btn.addEventListener('click', ()=>openModal(modalSelector,modalTimerId)); //когда передаем колбек функуцию в обработчик события мы ее не должны вызывать, поэтому используем такой синтаксиз
  });

  modalWindw.addEventListener('click',(event)=>{ 
    if(event.target === modalWindw || event.target.getAttribute('data-close') ==""){ 
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (event)=>{
    if(event.code === 'Escape' && modalWindw.classList.contains('show')){
      closeModal(modalSelector);
    }
  });

  function showModalByScroll(){
    if(window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      openModal(modalSelector,modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);

 //экспортируем функции в другой файл для их подальшего использования

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slides({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    
    const slideContent = document.querySelectorAll(slide),
          buttonNext = document.querySelector(nextArrow),
          buttonPrev = document.querySelector(prevArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width.replace(/\D/g, ""),
          slider =document.querySelector(container);
    let slideIndex = 1,
        offset = 0;

   
    if(slideContent.length <10){
        total.textContent = `0${slideContent.length}`;
        current.textContent=`0${slideIndex}`;
     } else{
       total.textContent = slideContent.length;
       current.textContent=slideIndex;
     }

    slidesField.style.width = 100 * slideContent.length +"%"; 
    slidesField.style.display ='flex'; 
    slidesField.style.transition = '0.5s all'; 
    slidesWrapper.style.overflow = 'hidden'; 

    slideContent.forEach(slide =>{
        slide.style.width =width; 
    });

    

     slider.style.position ='relative';
     const dots = document.createElement('ol'),
           arrDots =[];
  
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for(let i =0; i<slideContent.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        dots.append(dot);

        if(i==0){
            dot.style.opacity = 1; 
        }
        arrDots.push(dot); 
    }

    function opacity(i){
        arrDots.forEach(dot=>{
            dot.style.opacity= '.5';
       });   
       arrDots[i-1].style.opacity="1";  
    }
    function slideLenght(i){
        if(slideContent.length <10){
           
            current.textContent=`0${i}`;
         } else{
           
           current.textContent=i;
         }
    }


    buttonNext.addEventListener('click', ()=>{
        if(offset === +width*(slideContent.length-1)){ 
            offset = 0; 
        } else{
            offset += +width; 
        }

        if(slideIndex ==slideContent.length){
            slideIndex =1;
        }else{
            slideIndex++;
        }
        
        slideLenght(slideIndex);

         opacity(slideIndex);

        slidesField.style.transform = `translateX(-${offset}px)`; 
    });
    
    

    buttonPrev.addEventListener('click', ()=>{
        if( offset == 0){ 
            offset = +width*(slideContent.length-1);
        } else{
            offset -= +width;
        }


        if(slideIndex ==1){ 
            slideIndex =slideContent.length;
        }else{
            slideIndex--;
        }
        slideLenght(slideIndex);

         opacity(slideIndex);

        slidesField.style.transform = `translateX(-${offset}px)`;

    });
    

    arrDots.forEach(dot=>{
        dot.addEventListener('click', (e)=>{
            const indexTo = e.target.getAttribute('data-slide-to');
            slideIndex =indexTo;    
            offset = +width*(slideIndex-1);
            slidesField.style.transform = `translateX(-${offset}px)`;

           slideLenght(slideIndex);
            
            opacity(slideIndex);
            
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activClass){

const tabs =document.querySelectorAll(tabsSelector), 
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);



function hideTabContent(){
tabsContent.forEach(content =>{

  content.classList.add('hide');
  content.classList.remove('show', 'fade');
});

tabs.forEach(tab=>{
  tab.classList.remove(activClass);
});

}

function showTabContent(i=0 ){

tabsContent[i].classList.add('show', 'fade');
tabsContent[i].classList.remove('hide');
tabs[i].classList.add(activClass);
}

tabsParent.addEventListener('click', (event)=>{

const target = event.target; 
if(target && target.classList.contains(tabsSelector.slice(1))){
  tabs.forEach((tab,i)=>{ 
      if(target === tab){
          hideTabContent();
          showTabContent(i);
      } 
  });
}

});
hideTabContent();
showTabContent();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);




/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline){
    

 
 function getTimeRemaining(endtime){
    let t =Date.parse(endtime) - Date.parse(new Date()), 
       days = Math.floor(t/(1000*60*60*24)), 
        hours =Math.floor((t/(1000*60*60)%24)),
        minutes = Math.floor((t/1000/60)%60), 
        seconds =Math.floor((t/1000)%60); 

        if(t <= 0) { 
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
      
       return {
        "total": t, 
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
       };
 }
 

function getZero(num){
    if(num >=0 && num < 10){
        return `0${num}`;
    } else{
        return num;
    }
}



 function setClock(selector, endtime){
    const timer =document.querySelector(selector),
          days= timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
 
       let timeInterval = setInterval(updateClock, 1000); 

        updateClock(); 

    function updateClock(){
        const t = getTimeRemaining(endtime); 
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0){

            clearInterval(timeInterval);
        }
    }
}
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResuorse": () => (/* binding */ getResuorse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) =>{
    const res = await fetch(url, { 
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });

    return await res.json(); 
};

const getResuorse = async (url) =>{
    const res = await fetch(url); 
    
    if(!res.ok){
        
      throw  new Error(`Could not fetch ${url}, status: ${res.status}`); 
    }


    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");









window.addEventListener("DOMContentLoaded", ()=>{
    const modalTimerId = setTimeout(() => (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId ), 5000); 
(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
(0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal',modalTimerId);
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer','2023-06-11');
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form',modalTimerId);
(0,_modules_slides__WEBPACK_IMPORTED_MODULE_6__["default"])({
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map