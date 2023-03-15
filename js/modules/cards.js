import { getResuorse } from "../services/services";

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
    
  
    
    getResuorse('http://localhost:3000/menu')
    .then(data =>{
            
            data.sort((a,b)=>{return a.price - b.price;}).forEach(({img, altimg, title, descr, price}) =>{
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
            
        });
}

export default cards;