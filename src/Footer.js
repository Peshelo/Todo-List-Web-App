import React from 'react'

const Footer = ({length}) => {
  return (
    <footer>
      <b>{length} list {length === 1 ? "item" : "items"}</b>
    </footer>
  )
}

export default Footer