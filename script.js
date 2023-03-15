     //ДЕЛАЕМ ТАБЫ
// САМОЕ ГЛАВНОЕ - проговорить алгоритм действий: 3 действия...
// ... 1)Создание функции которая будет скрывать ненужные нам табы, 2)Показать нужный таб, 3)Назначить обработчик события на меню что бы скрывать или показывать его
// Создаем те табы на которые мы будем кликать
const tabs =document.querySelectorAll('.tabheader__item'), //Здесь обратились к блоку где(фитнес, премиум, постное)
      tabsContent = document.querySelectorAll('.tabcontent'),//Здесь к картинке и описанию, когда нажимаешь на (фитнес, премиум, постное)
      tabsParent = document.querySelector('.tabheader__items');// А здесь к родительному елементу (фитнес, премиум, постное), то бишь к нему одномиу


// tabheader__item_active данный элемент это класс активности, его нужно добалвять если мы на что то кликнули
// ЗАДАЧА 1 скрытие всех ненукжных нам табов
function hideTabContent(){
tabsContent.forEach(content =>{
  // content.style.display ='none' - ЭТО НАЗЫВАЕТСЯ ИНЛАЙН СТИЛИ; //Вот тут мы вообще все блоки с инфо и картинками скрыли
  //А СЕЙЧАС СДЕАЛЕМ ТОЖЕ САМОЕ ЧЕРЕЗ КЛАССЫ
  content.classList.add('hide');
  content.classList.remove('show', 'fade');
});
// Сечас тут же поработаем с классом активности . У каждаого таба будем удалять класс активности(тупо подсветка пунтка который мы выбрали)
tabs.forEach(tab=>{
  tab.classList.remove('tabheader__item_active');
});

}
//Создание второй функции, та котоаря показывать табы при выборе
function showTabContent(i=0 /*Параметр по умолчанию*/){
// tabsContent[i].style.display ='block'; // i та таба по номеру которую хотим показать
// Тоже самое что и в функции hideTabContent проделываем в функции showTabContent (вместо инлайн стилей используем классы)
tabsContent[i].classList.add('show', 'fade');
tabsContent[i].classList.remove('hide');
tabs[i].classList.add('tabheader__item_active');
}
//Задача 3 Делегирование событий и назначение обработчика клика
tabsParent.addEventListener('click', (event)=>{

const target = event.target; //Если мы часто будем использовать  event.target то можно запихнуть его в переменную
if(target && target.classList.contains('tabheader__item')){
  tabs.forEach((tab,i)=>{ 
      if(target === tab){
          hideTabContent(); //Если  скрыть данную функцию то они начнут появлятся по порядку нажатия
          showTabContent(i);
      } //Если target будет совпадать с тем элементом на который мы кликнули
  });
}

});
hideTabContent();
showTabContent();
// Если закоментить функции выше то страница начнет загружатся сразу со всеми табами, а при нажатии на tabs начнет отрабатывать правильно






  //ДЕЛАЕМ ТАЙМЕР
 //Алгоритм действий
 //Для начала нужная функция которая будет устанавливать наш таймер, дпльше функционал который будет определять разницу между временем, и последнее, функция которая будет заниматся нашим таймером

 const deadline = '2023-02-1'; //Наш дедлайн. Почему он в виде строки? потому что мы будем подвязывать его к какойто админ панели и получать из инпута
 //Сейчас реазизуем функцию которая будет определять разницу между deadline и текущим временем
 function getTimeRemaining(endtime){
    let t =Date.parse(endtime) - Date.parse(new Date()), //Date.parse() преврщает дату в цифровое значсение в милисекундах. new Date() позволяет узнать какая сейчас дата
        /*узнаем количество дней в t, для этого берем t и делим на кол-во милисек которое находится в одном дне и при этои нужно будет округлить с помощю Math.floor()*/days = Math.floor(t/(1000*60*60*24)), //Math.floor округление до ближайшего целого .Тут узнали сколько дней до оконачнии акциии
        hours =Math.floor((t/(1000*60*60)%24)),// в дне 24 часа
        minutes = Math.floor((t/1000/60)%60), //в одной минуте 60 сек
        seconds =Math.floor((t/1000)%60); //60 секунд равна одна минута

        if(t <= 0) { //условие что если t у нас будет отрицательной то все остальные значение автоматом становятся 0
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
      
       return {
        "total": t, // t нам нужна что бы знать, а вдруг таймер уже закончился
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
       };
 }
 
//Функция помощник которая транзформируте числа от 1до9 в 01.02...
function getZero(num){
    if(num >=0 && num < 10){
        return `0${num}`;
    } else{
        return num;
    }
}


 //Создаем функцию которая будет выставлять наш таймер на страницу
 function setClock(selector, endtime){
    const timer =document.querySelector(selector),
          days= timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
 //ТО ЧТО СВЕРХУ, ЭТО ПОЛУЧЕНИЕ ЕЛЕМЕНТОВ СО СТРАНИЦЫ
        timeInterval = setInterval(updateClock, 1000); // создали переменную в которую поместили нашу функцию updateClock и что бы оно обновлялось каждую секунду setIntrval работает пока нет clearInterval

        updateClock(); //Вручную запустим updateClock() что бы при обновлении верстки таймер не мигал
 //Дальше создаем функцию обновления наших часов, прямо внутри это функции
    function updateClock(){
        const t = getTimeRemaining(endtime); //Возвращает в данную t наш обьект
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0){
            //Мы останавливаем наш интервал когда наша t будет меньше или равна нулю
            clearInterval(timeInterval);
        }
    }
}
    setClock('.timer', deadline);




//МОДАЛЬНОЕ ОКНО
const btnModal = document.querySelectorAll('[data-modal]'),
modalWindw = document.querySelector('.modal');
 // escape =  modalWindw.querySelector('.modal__close');


function showModalWindow(){
  
 modalWindw.classList.add('show');
 modalWindw.classList.remove('hide');
 document.body.style.overflow = 'hidden'; //Позволяет убрать прокрутку модального окна и страницы когда мы в модальном окне
 clearInterval(modalTimerId); //Этот участок кода служит для того, что бы если модальное окно уже открыто, то через скрипт больше не показывалось
}

function hidModalWindow (){
  
   modalWindw.classList.add('hide');
   modalWindw.classList.remove('show');
   document.body.style.overflow = ''; // Возвращает прокркутку, пустые скобки специально, браузер автоматически поймет что подставить
}

btnModal.forEach(btn =>{
   btn.addEventListener('click', showModalWindow);
});

//   escape.addEventListener('click', hidModalWindow);

modalWindw.addEventListener('click',(event)=>{  // Этот обработчик создан для того что бы закрывать модальное окно нажатием на любую часть страницы
if(event.target === modalWindw || event.target.getAttribute('data-close') ==""){ //ВАЖНО  МЫ модифицировали данную строку. Мы создали крестки который закрывает модальное окно динамически через js и присвоили ему атрибут data-close, а в условии мы прописали что если нажимаем на таргет с атрибутом data-close то модалка закрывается.data-close присвоили пустое значение потому что там ничего нет 
   hidModalWindow();
}
});

document.addEventListener('keydown', (event)=>{
if(event.code === 'Escape' && modalWindw.classList.contains('show')){
   hidModalWindow();
}
});

//   const modalTimerId = setTimeout(showModalWindow, 5000); //Скрипт который показывет модальное окно через 5 сек

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

const getResuorse = async (url) =>{
    const res = await fetch(url); //Когда что то получаем настроек нет
    //Вручную обработаем специфику catch, которая не дает ошибку если (например неправильный url)
    if(!res.ok){
        //ОБЬЕКТ ОШИБКИ
      throw  new Error(`Could not fetch ${url}, status: ${res.status}`);  //throw значит -выкидываем "новую ошибку"
    }


    return await res.json();
};

getResuorse('http://localhost:3000/menu')
.then(data =>{
        
        data.sort((a,b)=>{return a.price - b.price;}).forEach(({img, altimg, title, descr, price}) =>{
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
        
    });




    //----------СЛАЙДЫ
    const slideContent = document.querySelectorAll('.offer__slide'),
          buttonNext = document.querySelector('.offer__slider-next'),
          buttonPrev = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width.replace(/\D/g, ""),
          slider =document.querySelector('.offer__slider');
    let slideIndex = 1,
        offset = 0;

    //-----------------БОЛЬЕЕ СЛОЖНЫЙ ВАРИАНТ СЛАЙДЕРА
    //ДЛЯ НАЧАЛА В html создаем дополнительную обертку(offer__slider-inner) делается это для того что бы главная обертка была как окошко
    if(slideContent.length <10){
        total.textContent = `0${slideContent.length}`;
        current.textContent=`0${slideIndex}`;
     } else{
       total.textContent = slideContent.length;
       current.textContent=slideIndex;
     }

    slidesField.style.width = 100 * slideContent.length +"%"; //Делается для того что бы поместить все слайды в обертку offer__slider-inner
    slidesField.style.display ='flex'; //Данная команда выстраивает слайды по горизонтали
    slidesField.style.transition = '0.5s all'; //Позволяет слайдам двигатся как в дверном замке
    slidesWrapper.style.overflow = 'hidden'; // Скрываем все файлы которые не попадают в область видимости

    slideContent.forEach(slide =>{
        slide.style.width =width; //Это делается для того что бы все картинки имели одинаковую ширину и эту ширину мы берем с window.getComputedStyle(slidesWrapper).width
    });

    
    //---------------------------ДЕЛАМЕ ТОЧКИ ПОД СЛАЙДАМИ
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
            dot.style.opacity = 1; //Класс активности при первой итерации
        }
        arrDots.push(dot); //Тут получается массив с точками
    }

    function opacity(i){
        arrDots.forEach(dot=>{
            dot.style.opacity= '.5';
       });   //ПОДСВЕТКА КНОПКИ
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
        if(offset === +width*(slideContent.length-1)){ //width ==500px мы тут пискили вырезаем !! ЕСли офсет равен длинне слайдов
            offset = 0; //ТО ВОЗВРАЩАЕМСЯ НА ПЕРВЫЙ СЛАЙД
        } else{
            offset += +width; //Двигатель слайтов !! СМОТРИ ВНИМАИЕЛЬНО НА + перед =
        }

        if(slideIndex ==slideContent.length){
            slideIndex =1;
        }else{
            slideIndex++;
        }
        
        slideLenght(slideIndex);

         opacity(slideIndex);

        slidesField.style.transform = `translateX(-${offset}px)`; //ГЛАВНОЕ УСЛОВЕИ НА ДВИЖЕНИЕ СЛАЙДОВ
    });
    
    

    buttonPrev.addEventListener('click', ()=>{
        if( offset == 0){ 
            offset = +width*(slideContent.length-1);
        } else{
            offset -= +width;
        }


        if(slideIndex ==1){ //ЕСЛИ УСЛОВИЕ С ВЫВОДОМ ЦИФР ПОСТАВИТЬ ПЕРВЫМ, ТО КОД БУДЕТ РАБОТАТЬ НЕКОРЕКТНО
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




    //-----------------------КАЛЬКУЛЯТОР
    const result = document.querySelector('.calculating__result span'); //span нужно указать что бы применились стили
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


    //Функция по расчету формулы
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

    function getStaticInfarmation(selector,activClass){ // Функция которая устанавливает класс активности и записывает пол и коэф.активности

        const elements =document.querySelectorAll(selector); //Через интерполяцию получаем все дивы, если без интерполяции то класс активности не будет удалятся

        elements.forEach(elem=>{
            elem.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){ //Если на кнопку которую мы нажали есть атрибут, мы его записываем в переменную ratio
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio')); //когда я кликаю на эти елементы они у меня сохраняются в localStorage
                } else{ //Если атрибута нет, значит это пол
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
            
                elements.forEach(elem=>{
                    elem.classList.remove(activClass);
                });
                e.target.classList.add(activClass); //Куда нажали, там будет класс активности
                calcTotal();
            });
        });
        
    }
    getStaticInfarmation("#gender div","calculating__choose-item_active");
    getStaticInfarmation(".calculating__choose_big div","calculating__choose-item_active");
    
    //Функция расчета
    function getDinamicInformation(selector/*инпут который нас интересует*/){
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



     //Формы
     const forms = document.querySelectorAll('form'); // Получаем все формы по тегу форм
     const massage ={
         loading : "img/spinner.svg",
         suqsses : "Все прошло успешно! Скоро мы с вами свяжемся",
         error : "ОШИБКА!"
     };
     
     forms.forEach(elem =>{
         bindPostData(elem);
     });
     
     const postData = async (url, data) =>{
         const res = await fetch(url, { //await Дожидаемся ответа от сервера
             method: "POST",
             headers: {
                 "Content-type": "application/json"
             },
             body: data
         });
     
         return await res.json(); //Это означем трансформация в формат json //await дожидаемся пока наш ответ от сервера трансформируется в json
     };
     
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
     
           //   const request = new XMLHttpRequest(); это удаляется и вместо этого будет fetch
           //   request.open('POST','server.php'); 
          
             const formData = new FormData(form); 
             //Более елегантный способ преобразить formData в JSON
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
             // const object = {};
             // formData.forEach((value, key) =>{
             //     object[key] = value;
             
             
               postData('http://localhost:3000/requests', json)
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
     
     //СПИНЕР В МОДАЛЬНОМ И В ОРДЕРЕ
         function showModalThanks(massage){
             const prewModalDialog = document.querySelector('.modal__dialog');
             prewModalDialog.classList.add('hide'); //Если не прописать данную функцию, то при появлении окна благодарнсоти не будет пропадать диалогове
             showModalWindow(); //Если не прописать эту функцию, то окно благодарности не вспылвет когда что то пропизуеешь в ордере
     
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
                 thanksModal.remove(); //Удаляет окно с ответом после вызова. В кратци, если не происать данную надпись, то окна благодпрности будут накапливатся
                 prewModalDialog.classList.add('show');  // Если не прописать эти две строки, то после первого заполенния формы она больше не появится
                 prewModalDialog.classList.remove('hide'); // Если не прописать эти две строки, то после первого заполенния формы она больше не появится
                 hidModalWindow(); //Если не прописать данную функцию то форма никода автоматически не закроется
            }, 4000);
         }
         
     
         //--------ПРИМИНЯЕМ ЗНАНИЕ  Promise и серверной части
         //Данный урок будет в "проекте без нотаток"!!