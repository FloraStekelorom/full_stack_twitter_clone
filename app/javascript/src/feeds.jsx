import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

import './feeds.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'User',
      userTweet: '',
      tweets: [],
      charCount: 0,
      tweetButton: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayUsername = this.displayUsername.bind(this);
    this.countChar = this.countChar.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.getTweets = this.getTweets.bind(this);
  }

  componentDidMount () {
    this.getTweets();
    this.displayUsername();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTweet();
  }

  displayUsername() {
    fetch(`/api/authenticated`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res);
      this.setState({ currentUser: res.username });
    })
  }

  countChar() {
    let {userTweet} = this.state;
    userTweet = userTweet.trim();

    let {charCount} = this.state;
    charCount =  userTweet.length;

    if (charCount > 0 && charCount <= 140) {
      this.setState({tweetButton:false});
      console.log(charCount);
      this.setState({charCount: userTweet.length})
      this.setState({userTweet: userTweet.trim()})
    } else {
      console.log(charCount);
      this.setState({tweetButton:true});
    }
  }

  postTweet() {
    let userTweet = this.state;

    fetch(`/api/tweets`, safeCredentials({
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweet: {
          message: userTweet,
        }
      })
    })).then((data) => {
        console.log('success');
        this.setState({userTweet:''});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getTweets() {
    let tweets = this.state;

    fetch(`/api/tweets`, {
      method: 'GET',
    })
    .then(handleErrors)
    .then(res => {
      console.log('success');
      this.setState({tweets: res.tweets});
    })
  }

  render () {
    const {currentUser, userTweet, charCount, tweetButton, tweets } = this.state;

    return (
      <Navbar>
        <div id="feedPage">
          <div className="row">
            <div className="col-xs-3 profile-trends">
              <div className="profileCard col-xs-12">
                <div className="profileCard-content">
                  <div className="user-field col-xs-12">
                    <a className="username" href="#">{currentUser}</a><br/>
                    <a className="screenName" href="#">@{currentUser}</a>
                  </div>
                  <div className="user-stats">
                    <div className="col-xs-3">
                      <a href="">
                        <span>Tweets<br/></span>
                        <span className="user-stats-tweets">10</span>
                      </a>
                    </div>
                    <div className="col-xs-4">
                      <a href="">
                        <span>Following<br/></span>
                        <span className="user-stats-following">0</span>
                      </a>
                    </div>
                    <div className="col-xs-4">
                      <a href="">
                        <span>Followers<br/></span>
                        <span className="user-stats-followers">0</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trends col-xs-12">
                <div className="col-xs-12">
                  <div className="trends-header">
                    <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
                  </div>
                  <ul className="trends-list">
                    <li><a href="#">#Hongkong</a></li>
                    <li><a href="#">#Ruby</a></li>
                    <li><a href="#">#foobarbaz</a></li>
                    <li><a href="#">#rails</a></li>
                    <li><a href="#">#API</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-6 feed-box">
              <div className="col-xs-12 post-tweet-box">
                <form onSubmit={this.handleSubmit} className="form-inline my-4">
                  <input type="text" className="form-control" placeholder="What's happening?" value={userTweet} onKeyUp={this.countChar} onChange={this.handleChange} name="userTweet" required/>
                  <div className="pull-right">
                    <span className="post-char-counter">140</span>
                    <button className="btn btn-primary" disabled={tweetButton} id="post-tweet-btn">Tweet</button>
                  </div>
                </form>
              </div>
              <div className="feed">
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">{currentUser}</a>
                  <a className="tweet-screenName" href="#">@{currentUser}</a>
                  <p>This is an amazing tweet</p>
                  <a className="delete-tweet" href="#">Delete</a>
                </div>
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">{currentUser}</a>
                  <a className="tweet-screenName" href="#">@{currentUser}</a>
                  <p>This is an amazing tweet</p>
                  <a className="delete-tweet" href="#">Delete</a>
                </div>
                <div className="tweet col-xs-12">
                  <a className="tweet-username" href="#">{currentUser}</a>
                  <a className="tweet-screenName" href="#">@{currentUser}</a>
                  <p>This is an amazing tweet</p>
                  <a className="delete-tweet" href="#">Delete</a>
                </div>
              </div>
            </div>
            <div className="col-xs-3 follow-suggest">
            </div>
          </div>
        </div>
      </Navbar>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})
