import React from 'react'
import { Link } from 'react-router-dom'

export const RefinedLink = props => {
  const innerProps = {
    ...props,
    to: `${process.env.PUBLIC_URL}${props.to}`,
    children: void 0,
    style: {
      ...props.style,
      textDecoration: 'none',
    },
  }
  return <Link { ...innerProps }>{props.children}</Link>
}

export default RefinedLink
