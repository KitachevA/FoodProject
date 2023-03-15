
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

export default modalWindow;
export {openModal};
export {closeModal}; //экспортируем функции в другой файл для их подальшего использования