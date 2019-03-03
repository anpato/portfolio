const nav = document.querySelector('.main-nav');
const bio = document.querySelector('.about');
const proj = document.querySelector('.projects');
const home = document.getElementById('particles-js');
const social = document.querySelector('.inactive');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');


const scrollToTop = () => {
    home.scrollIntoView({
        behavior: 'smooth',
        block : 'start'
    })
}

const scrollToBio = () => {
    bio.scrollIntoView({
        behavior : 'smooth',
        block : 'start'
    })
}

const scrollToProj = () => {
    proj.scrollIntoView({
        behavior : 'smooth',
        block : 'start'
    })
}

const navColorToggle = () => {
    if(window.scrollY >= 80){
        nav.classList.add('active');
        menu.classList.remove('menu-show');
        burger.classList.remove('open');
    } else nav.classList.remove('active');
}

const socialGrow = () => {
        social.classList.toggle('socialEnter');
    }

toggleBurger = () => {
    burger.classList.toggle('open');
    menu.classList.toggle('menu-show');
}

burger.addEventListener('click', toggleBurger);
social.addEventListener('mouseenter', socialGrow);
social.addEventListener('mouseleave', socialGrow)

window.addEventListener('scroll', navColorToggle);
console.log('working')