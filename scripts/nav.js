const d = document;

//elements
const home = d.getElementById('logo');
const link1 = d.getElementById('one');
const link2 = d.getElementById('two');
const link3 = d.getElementById('three');

//containers
const main = d.getElementById('container');
const homeDown = d.getElementById('home-bottom');
const projectTop = d.getElementById('projects');
const projectBtm = d.getElementById('project-down');
const contactTop = d.getElementById('contact-text');

//hamburger 
const burger = document.querySelector('.burger-squeeze');
const menu = document.querySelector('.menu-wrap');

//scroll functions
function scrollToProject() {
    projectTop.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function scrollToContact() {
    contactTop.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function scrollToHome() {
    home.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    })
}

//menu methods

burgerToggle = e => {
    e.preventDefault;
    burger.classList.toggle('open');
    menu.classList.toggle('show');
}

menuHide = () => {
    if(window.scrollY > 10){
        burger.classList.remove('open');
        menu.classList.remove('show');
    }
}

burger.addEventListener('click', burgerToggle)

window.addEventListener('scroll', menuHide);

