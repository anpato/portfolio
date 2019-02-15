//sections
const logo = document.getElementById('logo');
const projects = document.getElementById('proj-top');
const contact = document.getElementById('contact-head');

//arrows
const arrowUp = document.getElementById('arrow-up');
const arrowDwn = document.getElementById('arrow-down');


//hamburger 
const burger = document.querySelector('.burger-squeeze');
const menu = document.querySelector('.menu-wrap');

//scroll functions
function scrollToProject() {
    projects.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function scrollToHome() {
    logo.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    })
}

function scrollToContact() {
    contact.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

//menu methods

burgerToggle = e => {
    e.preventDefault;
    burger.classList.toggle('open');
    menu.classList.toggle('show');
}

menuHide = () => {
    if (window.scrollY > 10) {
        burger.classList.remove('open');
        menu.classList.remove('show');
    }
}

arrowUp.addEventListener('click', scrollToHome);
arrowDwn.addEventListener('click', scrollToProject);


burger.addEventListener('click', burgerToggle)

window.addEventListener('scroll', menuHide);


burger.addEventListener('click', burgerToggle)

window.addEventListener('scroll', menuHide);

