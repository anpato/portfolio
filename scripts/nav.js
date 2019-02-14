const d = document;

const home = d.getElementById('logo');
const link1 = d.getElementById('one');
const link2 = d.getElementById('two');
const link3 = d.getElementById('three');

const homeDown = d.getElementById('home-bottom');

const projectTop = d.getElementById('projects');
const projectBtm = d.getElementById('project-down');

const contactTop = d.getElementById('contact-text');

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

