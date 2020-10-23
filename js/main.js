(() => {
  const bookItem = document.querySelectorAll('.book-item');
  const bookSpring = document.querySelectorAll('.book-spring');
  let book;
  const setSpring = () => {
    const bookHeight = window.innerHeight * 0.7;
    for (let i = 0; i < bookHeight / 27; i++) {
      const spring = document.createElement('div');
      spring.className = 'spring-item';
      bookSpring[0].appendChild(spring);
    }
  }
  const removeSpring = () => {
    const springItem = document.querySelectorAll('.spring-item');
    for (let i = 0; i < springItem.length; i++) {
      springItem[i].remove();
    }
  }
  for (let i = 0; i < bookItem.length; i++) {
    bookItem[i].style.zIndex = bookItem.length - i;
  }
  window.addEventListener('load', () => {
    setSpring();
  })
  window.addEventListener('resize', () => {
    removeSpring();
    setSpring();
  })
  const getTarget = (elem, className) => {
    if (elem.nodeName == 'BODY') {
      return;
    }
    while (!elem.classList.contains(className)) {
      elem = elem.parentNode;
      if (elem.nodeName == 'BODY') {
        elem = null;
        return;
      }
    }
    return elem;
  }
  function closeBook(elem) {
    let i=elem.children.length-2;
      
    const time = setInterval(()=>{
      elem.children[i].style.transform = `rotateY(0deg)`
      i--
      if(i===0){
        clearInterval(time);
      }
    },200)
  }
  document.body.addEventListener('click', e => {
    const book_list = document.querySelector('.book-list');
    const book_item = getTarget(e.target, 'book-item');
    const moveBack = getTarget(e.target, 'move-back-button');
    const nodeA = getTarget(e.target, 'link');
    const endPage = getTarget(e.target, 'end-page');
    if(nodeA) {
      return;
    }else if(endPage) {
      let i=book_list.children.length-2;
      
      closeBook(book_list)
    } 
    else if (moveBack) {
      console.log(moveBack.parentNode.parentNode.previousElementSibling)
      moveBack.parentNode.parentNode.previousElementSibling.style.transform = `rotateY(0deg)`
    }
    else if (book && book_item) {
      book_item.style.transform = `rotateY(-150deg)`
    }
    book = getTarget(e.target, 'book');
    const closeButtonElem = document.querySelector('.close-button')
    const closeButton = getTarget(e.target, 'close-button');
    if(closeButton){
      book_list.style.transform = `scale(0.3) translate(0px,0px)`
      closeBook(book_list)
    }
    else if (book) {
      setTimeout(()=>{
        closeButtonElem.style.display="inline"
      }, 1000)
      book.classList.add('current-book');
      book_item.parentNode.style.transform = `scale(1) translate(0px,0px)`
    }
  })
})()