import React from 'react';
import "./Homepage.css";

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const getHomepage = this.props.firebase
      .functions()
      .httpsCallable('getHomepage');
    const homepage = await getHomepage();
    this.setState({ homepage: homepage.data });
  }

  render () {
    if (!isLoaded(this.state.homepage)) {
      return <div>Loading...</div>;
    }

    const preDecks = this.state.homepage;
    const deckKeys = Object.keys(preDecks);
    let filtered = [];

    for (let i = 0; i < deckKeys.length; i++) {
      if (preDecks[deckKeys[i]].visibility || 
          preDecks[deckKeys[i]].owner === this.props.isLoggedIn) {
            filtered = filtered.slice().concat(deckKeys[i]);
          }
    }

    const decks = filtered.map((deck) => {
      return (
        <div key={deck} >
          <Link 
            class="decks" 
            to={'/viewer/' + deck}
            >{preDecks[deck].name}
          </Link>
          <div class='desc'>
            {preDecks[deck].description}
          </div>
        </div>
      );
    });

    return (
      <div>
        <div class='home'>
          <img id="kirbyhome" src={require('./FlashCards.png')} alt="Kirbs!"/>
          <h1 class="homepage1">Homepage</h1>
          {
            this.props.isLoggedIn ? (
              <div class="account">
                <h3>Account: {this.props.email}</h3>
                <Link class="editorhome" to="/profile">View Profile</Link>
                <button 
                  class="adddel" 
                  onClick={() => this.props.firebase.logout()}
                  >
                  Logout
                </button>
              </div>
            ) : (
              <div class="account">
                <Link class="editorhome" to="/register">Register</Link>
                <Link class="editorhome" to="/login">Login</Link>
              </div>
            )
          }
        </div>
        <br />
        <br/>
        <div class="center">
          <Link class="homepage" to="/editor">Create a new deck!</Link>
        </div>
        <p class="decksh">Flashcards:</p>
        <div class="center">
          {decks}
        </div>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid, 
  };
};

export default compose(
  withRouter,
  firebaseConnect(), 
  connect(mapStateToProps),
)(Homepage);