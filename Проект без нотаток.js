window.addEventListener("DOMContentLoaded", ()=>{
    

const tabs =document.querySelectorAll('.tabheader__item'), 
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
   


function hideTabContent(){
    tabsContent.forEach(content =>{
       
        content.classList.add('hide');
        content.classList.remove('show', 'fade');
    });
    tabs.forEach(tab=>{
        tab.classList.remove('tabheader__item_active');
    });

}

function showTabContent(i=0 ){
    
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

tabsParent.addEventListener('click', (event)=>{
   
    const target = event.target; 
    if(target && target.classList.contains('tabheader__item')){
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


 const deadline = '2021-12-12';
 
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
 
        timeInterval = setInterval(updateClock, 1000); 
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
    setClock('.timer', deadline);

    //МОДАЛЬНОЕ ОКНО
    const btnModal = document.querySelectorAll('[data-modal]'),
          modalWindw = document.querySelector('.modal'),
          escape =  modalWindw.querySelector('.modal__close');

    function showModalWindow(){
        modalWindw.classList.add('show');
        modalWindw.classList.remove('hide');
        document.body.style.overflow = 'hidden'; 
        clearInterval(modalTimerId); 
    }
     function hidModalWindow (){
         modalWindw.classList.add('hide');
         modalWindw.classList.remove('show');
         document.body.style.overflow = ''; 
       }
       
    btnModal.forEach(btn =>{
        btn.addEventListener('click', showModalWindow);
    });
    escape.addEventListener('click', hidModalWindow);

    modalWindw.addEventListener('click',(event)=>{  
      if(event.target === modalWindw){
          hidModalWindow();
      }
    });
  
    document.addEventListener('keydown', (event)=>{
      if(event.code === 'Escape' && modalWindw.classList.contains('show')){
          hidModalWindow();
      }
    });
  
    const modalTimerId = setTimeout(showModalWindow, 5000); 
  
    function showModalByScroll(){
      if(window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight){
          showModalWindow();
          window.removeEventListener('scroll', showModalByScroll);
      }
    }
    window.addEventListener('scroll', showModalByScroll);
   
  //ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК
  
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
  new MenuCard (
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container', 
      'menu__item'
  
  ).render();
  
  new MenuCard (
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      20,
      '.menu .container',
      'menu__item'
  
  ).render();
  
  new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      16,
      '.menu .container',
      'menu__item'
  
  ).render();
  
  //БЕКЭНД ----------ТУТ БУДЕТ ОТЛИЧАТСЯ ОТ map.js БУДЕЛ СДЕЛАНО С ПОМОЩБ fetch()
  const forms = document.querySelectorAll('form'); 
  const massage ={
      loading : "img/spinner.svg",
      suqsses : "Все прошло успешно! Скоро мы с вами свяжемся",
      error : "ОШИБКА!"
  };
  
  
  forms.forEach(elem =>{
    BindPostData(elem);
  });

  function BindPostData(form){
      form.addEventListener('submit', (event)=>{ 
          event.preventDefault(); 
  
          const statusMessage = document.createElement('img'); 
          statusMessage.src = massage.loading;
          statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto   
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        //   const request = new XMLHttpRequest(); это удаляется и вместо этого будет fetch
        //   request.open('POST','server.php'); 
       
          const formData = new FormData(form); 
          
          fetch('server.php', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: formData
            }).then(data => data.text())
            .then(data=>{ //data те данные которые нам вернул сервер
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
    showModalWindow();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class ="modal__content">
        <div class = "modal__close" data-close>×</div>
        <div class ="modal__title">${massage}</div>
        </div>
    `;
   modalWindw.append(thanksModal);
   setTimeout(()=>{
        thanksModal.remove(); 
        prewModalDialog.classList.add('show'); 
        prewModalDialog.classList.remove('hide'); 
        hidModalWindow(); 
   }, 4000);
}

});