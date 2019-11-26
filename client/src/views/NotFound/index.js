import React from 'react'
import { FlexLayout, Button } from '../../shared'
import NotFoundImage from '../../assets/404-2.png'
const NotFound = ({ history, darkTheme }) => (
  <FlexLayout
    className="404"
    align="center"
    layout="col"
    style={{ width: '100%' }}
  >
    <div className="wrapper">
      <img src={NotFoundImage} />
      <FlexLayout className="404-message" layout="col" align="center">
        <h2>Well This is awkward...</h2>
        <h4>It seems that the page you were looking for doesn't exist</h4>
        <p>Give one of these a try!</p>
        <FlexLayout
          className="btn-wrapper"
          align="space"
          style={{ width: '80%' }}
        >
          <Button
            title="Home"
            variant="flat"
            color={darkTheme ? 'green' : 'blue'}
            onClick={() => history.push('/')}
          />
          <Button
            title="Projects"
            variant="flat"
            color={darkTheme ? 'green' : 'gold'}
            onClick={() => history.push('/projects')}
          />
          {/* <Button title='Home'/> */}
        </FlexLayout>
      </FlexLayout>
    </div>
  </FlexLayout>
)

export default NotFound
