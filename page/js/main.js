const menu = document.getElementById('menu__toggle');
const activeClass = 'active';


menu.addEventListener('click', (e) => {
  if (menu.classList.contains(activeClass)) {

    document.body.style.overflow = 'auto';
    menu.classList.remove(activeClass);
  } else {
    document.body.style.overflow = 'hidden';
    menu.classList.add(activeClass)
  }
})