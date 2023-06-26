import React from 'react'
import { Link } from 'react-router-dom'
import style from './home.module.css'
import pic1 from '../Img/dg logo.webp'

const Nav = () => {
  return (
    <div id={style.nav}>
        <div id={style.pic1}>
            <Link to='/'><img src={pic1} alt='error'/></Link>
        </div>
        <div id={style.modules}>
            <Link to='/'>Home</Link>
            <Link to='/createtenants'>Create Tenant</Link>
            <Link to='/rentrecords'>Rent Details</Link>
        </div>
    </div>
  )
}

export default Nav
