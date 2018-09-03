import React from 'react'

const appVersion = process.env.REACT_APP_VERSION
const appName = process.env.REACT_APP_NAME

export const Footer = () => <footer>{`${appName}@${appVersion}`}</footer>

export default Footer
