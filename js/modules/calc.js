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

export default calc;