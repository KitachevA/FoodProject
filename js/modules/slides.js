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

export default slides;