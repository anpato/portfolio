import React from 'react'
import { FlexLayout } from '../../../shared'
import Bitmoji from '../../../assets/bitmoji.png'

const About = () => (
  <FlexLayout className="about" layout="center start">
    <div className="about-img">
      <img
        src="https://render.bitstrips.com/v2/cpanel/3e65fa6b-bc0b-4dc4-a110-2f92106e3d57-d1997244-8d75-4115-9698-a946ac02b403-v1.png?transparent=1&palette=1"
        alt={Bitmoji}
      />
    </div>
    <hgroup className="bubble about-text">
      <h2>About Me</h2>
      <p>
        I am a purposeful Front end Developer who thrives as both a self-starter
        and collaborative team player. As both a Software Engineer and former
        Automotive technician, I strive to create products that are both optimal
        in their functionality and user experience. As a developer, I seek the
        opportunity to resolve complex, technical issues with the consumer's
        needs at the forefront of what I do.
      </p>
    </hgroup>
  </FlexLayout>
)

export default About
