import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';

import './home.scss';

import background_1 from '../images/background_1.png'
import background_2 from '../images/background_2.png'
import background_3 from '../images/background_3.jpg'

const backgroundURL = [
  background_1,
  background_2,
  background_3,
]

class Home extends React.Component {
  state = {
    backStep: 0,
  }

  componentDidMount () {
    this.backgroundTimer = window.setInterval(() => {
      let backStep = this.state.backStep + 1;

      if (backStep == backgroundURL.length) {
        backStep = 0;
      };
      this.setState({ backStep });
    }, 10000);
  }

  componentWillUnmount () {
    window.clearInterval(this.backgroundTimer);
  }

  render () {
    const backgroundImg = backgroundURL[this.state.backStep];

    return (
      <Layout>
        <div id="homeback" style={{backgroundImage: `url(${backgroundImg})`}}>
        </div>
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="front-card col-xs-10 col-xs-offset-1">
                <div className="col-xs-6 welcome">
                  <div id="welcome-text">
                    <h1><strong>Welcome to Twitter.</strong></h1>
                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                  </div>
                  <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                  <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br/>3:20 PM - 15 December 2016</a></p>
                </div>
                <div className="log-in col-xs-4 col-xs-offset-1">
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control username" placeholder="Username"/>
                    </div>
                    <div className="form-group col-xs-8">
                      <input type="password" className="form-control password" placeholder="Password"/>
                    </div>
                    <button id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1">Log in</button>
                    <label>
                      <input type="checkbox"/>
                      <span>Remember me</span>
                      <span> &#183; </span>
                    </label>
                    <a href="#">Forgot password?</a>
                  </form>
                </div>
                <div className="sign-up col-xs-4 col-xs-offset-1">
                  <form>
                    <div className="new-to-t">
                      <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control username" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control email" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control password" placeholder="Password"/>
                    </div>
                    <button id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )

  // Should not use jQuery with React, should use React lifecycle for those things.

  // $(".home").ready(function(){

  //------------------ changing background image ---------------------
  // var backgroundURL = [
  //   "../images/background_2.png",
  //   "../images/background_3.jpg",
  //   "../images/background_1.png",
  // ];

  // var backStep = 0;

  // var backgroundTimer = setInterval(function(){
  //   backStep++;
  //   if(backStep == backgroundURL.length) {
  //     backStep = 0;
  //   };
  //   var imageUrl = backgroundURL[backStep];
  //   setTimeout(function(){
  //     $('#homeback').fadeOut(1000, function(){
  //       $('#homeback').css('background-image', 'url(' + imageUrl + ')');
  //       $('#homeback').fadeIn(1000);
  //     });
  //   });
  // }, 10000);

  // });


})
