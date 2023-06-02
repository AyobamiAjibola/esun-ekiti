import React, { useState, ReactNode } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import "./style.css";

interface Props {
  children?: ReactNode
  to?: any
}

export default function Nav () {
  const [state, setState] = useState(false);

  const onClick = () => {
    setState(!state)
  }

  const close = () => {
    setState(false)
  }

  return (
    <>
      <nav id='navy'
        style={{
          backgroundColor: 'white',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <Link to='/' id="logo"
          style={{
            marginTop: '-1rem',
            marginBottom: '-1rem',
            width: '50%'
          }}
        >
          <img
            src='assets/logo.png'
            alt='logo'
            style={{
              width: '4rem',
              height: '4rem'
            }}
          />
        </Link>
        <div
          style={{
            marginTop: '-1rem',
            marginBottom: '-1rem'
          }}
        >
          <ul id="navbar" className={ state ? "active" : "" } onClick={ close } >
            <CustomLink to="/" >Home</CustomLink>
            <CustomLink to="/history">History</CustomLink>
            <CustomLink to="/council">Council</CustomLink>
            <CustomLink to="/news">News</CustomLink>
            <CustomLink to="/project">Project</CustomLink>
            <CustomLink to="/event">Events</CustomLink>
          </ul>
        </div>
        <div onClick={ onClick } id="mobile-view"
          style={{
            marginTop: '-1rem',
            marginBottom: '-1rem'
          }}
        >
          <i id="bar"
            className={ state ? 'fas fa-times' : 'fas fa-bars' }
          ></i>
        </div>
      </nav>
    </>
  )
}

function CustomLink ({ to, children, ...props }: Props) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
      <li className={(isActive != null) ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
  )
}
