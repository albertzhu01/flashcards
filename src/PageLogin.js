import React from 'react';
import { firebaseConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        email: '',
        password: '',
      };
  }

  handleChange = event =>
  this.setState({ [event.target.name]: event.target.value, error: '' });

  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      await this.props.firebase.login(credentials);
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
        <h1 class="center">Login</h1>
        <div class="center">
          <div>{this.state.error}</div>
          <input 
            name="email" 
            class="input"
            onChange={this.handleChange} 
            placeholder="Email" 
            value={this.state.email}
          />
          <br/>
          <input
            name="password" 
            class="input"
            onChange={this.handleChange} 
            placeholder="Password"
            type="password" 
            value={this.state.password}
          />
          <br/>
          <button class="adddel" onClick={this.login}>Login!</button>
        </div>
        <hr />
        <br/>
        <Link class="editor" to="/">Home</Link>
        <br />
        <Link class="editor" to="/register">Register</Link>
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
)(PageLogin);
