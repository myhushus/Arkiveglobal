const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
