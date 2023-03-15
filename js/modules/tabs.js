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

export default tabs;


