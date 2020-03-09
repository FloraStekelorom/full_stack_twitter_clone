import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';

const Home = props => (
  <div>Home Page</div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
