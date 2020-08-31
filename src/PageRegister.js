import React from 'react';
import { firebaseConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        email: '',
        password: '',
        username: '',
      };
  }

  handleChange = event =>
  this.setState({ [event.target.name]: event.target.value, error: '' });

  register = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    const profile = {
      email: this.state.email,
      username: this.state.username,
      saved: []
    }

    try {
      await this.props.firebase.createUser(credentials, profile);
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
    }
  };

  render () {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <img id="kirbyhome" src={require('./FlashCards.png')} alt="Kirbs!"/>
        <h1 class="center">Register</h1>
        <div class="center">
          <div>{this.state.error}</div>
          <input 
            class="input"
            name="email" 
            onChange={this.handleChange} 
            placeholder="Email" 
            value={this.state.email}
          />
          <br/>
          <input
            class="input"
            name="password" 
            onChange={this.handleChange} 
            placeholder="Password"
            type="password" 
            value={this.state.password}
          />
          <br/>
          <input
            class="input"
            name="username" 
            onChange={this.handleChange} 
            placeholder="Username"
            value={this.state.username}
          />
          <br/>
          <button 
            class="adddel"
            disabled={this.state.username.trim() === ''}
            onClick={this.register}
          >
            Register!
          </button>
        </div>
        <hr />
        <br/>
        <Link class="editor" to="/">Home</Link>
        <br />
        <Link class="editor" to="/login">Login</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.firebase.auth.uid };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PageRegister);
