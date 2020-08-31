import React from 'react';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '', editing: false };
  }

  async componentDidMount() {
    const getHomepage = this.props.firebase
      .functions()
      .httpsCallable('getHomepage');
    const homepage = await getHomepage();
    this.setState({ homepage: homepage.data });
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  updateUsername = () => {
    if (this.state.editing && this.state.user.trim() !== '') {
      const updates = { email: this.props.email, 
                        username: this.state.user };
      this.props.firebase.updateProfile(updates);
    }
    this.setState({ user: '', editing: !this.state.editing })
  }

  render () {
    if (!this.props.isLoggedIn) {
        return <Redirect to="/register" />
    }

    if (!isLoaded(this.state.homepage)) {
      return <div>Loading...</div>;
    }

    const decks = this.props.saved.map((deck) => {
      return (
        <div key={deck} >
          <Link 
            class="decks" 
            to={'/viewer/' + deck}
            >{this.state.homepage[deck].name}
          </Link>
          <div class='desc'>
            {this.state.homepage[deck].description}
          </div>
        </div>
      );
    });

    return (
      <div>
        <img id="kirbyhome" src={require('./FlashCards.png')} alt="Kirbs!"/>
        <h1 class="center">Profile</h1>
        <div class="decksh">
          <div>Email: {this.props.email}</div>
          <div>Username: {this.props.username}</div>
          <input
              hidden={!this.state.editing}
              class="input"
              name="user" 
              onChange={this.handleChange} 
              placeholder="Username"
              value={this.state.user}
            />
            <br/>
            <button 
              class="adddel"
              onClick={this.updateUsername}
            >
              {this.state.editing ? 'Update username' : 'Edit username'}
            </button>
            <br />
            <br />
            <p class="center">Saved decks:</p>
            <div class="center">
              {decks}
            </div>
            <br />
            <Link class="editor" to="/">Homepage</Link>
            <div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    saved: state.firebase.profile.saved,
    username: state.firebase.profile.username,
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid, 
  };
};

export default compose(
  withRouter,
  firebaseConnect(['\homepage']), 
  connect(mapStateToProps),
)(Profile);