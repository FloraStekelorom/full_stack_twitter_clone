import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';

import './feed.scss';

class Feed extends React.Component {
  render () {
    return (
      <Layout>
        <div>Feed Page</div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})
