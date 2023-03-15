import { closeModal, openModal } from "./modalWindow";
import { postData } from "../services/services";

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
        
        
        
          postData('http://localhost:3000/requests', json)
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
        openModal('.modal',modalTimerId); 

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
            closeModal('.modal'); 
       }, 4000);
    }
    

    
}

export default forms;