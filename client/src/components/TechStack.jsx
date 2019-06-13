import React from 'react';
import AdobeXd from '../assets/img/Adobe_XD_CC_icon.png';
import Html5 from '../assets/img/html5.png';
import Css from '../assets/img/css-3.png';
import Sass from '../assets/img/sass.png';
import Javascript from '../assets/img/javascript.png';
import ReactImg from '../assets/img/react.png'

const TechStack = () => {
    return (
        <div className="stack">
                <h2>Stack</h2>
            <ul>
                <li>Adobe Xd <img src={AdobeXd} alt='adobexd'/></li>
                <li>Html 5 <img src={Html5} alt='html logo'/></li>
                <li>CSS3 <img src={Css} alt='css-logo'/></li>
                <li>Sass <img src={Sass} alt='sass logo'/></li>
                <li>Javascript(ES6) <img src={Javascript} alt='javascript-logo'/></li>
                <li>React JS <img src={ReactImg} alt='react-logo'/></li>
            </ul>
        </div>
    )
}
export default TechStack