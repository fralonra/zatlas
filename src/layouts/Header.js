import React from 'react'
import { GitHub } from 'react-feather'

import { style } from '../config'

const styles = {
  header: {
    padding: '1rem',
    background: style.background.header,
    color: style.color.header
  },
  brand: {
    float: 'left',
    lineHeight: 1.5
  },
  links: {
    float: 'right'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

const brand = 'Zatlas - Online random heightmap generator.'

const links = [{
  label: 'View Code on Github',
  url: 'https://github.com/fralonra/zatlas',
  icon: <GitHub className='icon-button' />
}]

function Header () {
  return (
    <div style={styles.header}>
      <div style={styles.brand}>{brand}</div>
      <div style={styles.links}>
        {links.map(l => {
          return (
            <a key={l.label} style={styles.link} href={l.url}>{l.icon
              ? l.icon
              : l.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Header
