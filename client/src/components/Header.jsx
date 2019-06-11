import React from 'react'
import {Appbar} from 'muicss/react'

const Header = props => {
  const toggleHeight = window.screenY > 40 ? 'header header small' : 'header'
  return (
    <Appbar className={toggleHeight}>
      <table width="100%">
        <tbody>
          <tr >
            <td className="mui--appbar-height">
              
            </td>
            <td className="mui--appbar-height" >

            </td>
          </tr>
        </tbody>
      </table>
    </Appbar>   
  )
}

export default Header