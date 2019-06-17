import React from 'react';
import {FaGithubSquare, FaLinkedin} from 'react-icons/fa'
const Social = () => {
    return (
        <div className="social">
            <a href="https://github.com/anpato" 
                target="_blank" rel="noopener noreferrer">
                <FaGithubSquare/>
            </a>
            <a href="https://www.linkedin.com/in/anpato/"
            target=
            "_blank" rel="noopener noreferrer">
                <FaLinkedin/>
            </a>
        </div>
    )
}

export default Social