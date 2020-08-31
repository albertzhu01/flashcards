import React from 'react';
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import swal from 'sweetalert';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      front: '', back: '',
      frontFace: true,
      i: 0,
    };
  }

  flipCard = () => {
    this.setState({frontFace: !this.state.frontFace});
  }

  prevCard = () => {
    this.setState({i: this.state.i - 1});
    this.setState({frontFace: true});
  }

  nextCard = () => {
    this.setState({i: this.state.i + 1});
    this.setState({frontFace: true});
  }

  randomize = () => {
    this.setState({i: Math.floor(Math.random() * this.props.cards.length)});
    this.setState({frontFace: true});
  }

  arrows = event => {
    if (event.keyCode === 37 && this.state.i > 0) {
      this.prevCard();
    }

    if (event.keyCode === 39 && this.state.i < this.props.cards.length - 1) {
      this.nextCard();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.arrows, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.arrows, false);
  }

  saveDeck = () => {
    let updates = {};
    let newSaved = [];
    const deck = this.props.deck;
    console.log(this.props.saved && this.props.saved.indexOf(deck));
    if (this.props.saved && this.props.saved.indexOf(deck) !== -1) {
      newSaved = this.props.saved.slice();
      const index = newSaved.indexOf(deck);
      newSaved.splice(index, 1);
      swal(this.props.name + ' removed from profile page');
    }
    else if (this.props.saved) {
      newSaved = this.props.saved.slice().concat(deck);
      swal(this.props.name + ' saved to profile page');
    }
    else {
      newSaved = [deck];
      swal(this.props.name + ' saved to profile page');
    }
    updates = { saved: newSaved };
    this.props.firebase.updateProfile(updates);
    console.log(this.props.saved && this.props.saved.indexOf(deck));
  };

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>
    }

    var fron = 'front';
    
    if (this.state.frontFace) {
      fron = 'front';
    } else {
      fron = 'back';
    }

    return (
      <div>
        <img id="kirby" src={require('./FlashCards.png')} alt="Kirbs!"/>
        <h1 class="center">{this.props.name}</h1>
        <h3 class="center">{this.props.description}</h3>
        <p 
          style={{textAlign: "center"}}
          >
          Created by {this.props.creator.owner.username}
        </p>
        <div class="row">
          <button 
            class="switch" 
            onClick={this.prevCard} 
            disabled={this.state.i <= 0}
            >
            Previous card
          </button>
          <button 
            class="switch" 
            onClick={this.randomize} 
            >Random card
          </button>
          <button 
            class="switch" 
            onClick={this.nextCard} 
            disabled={this.state.i >= this.props.cards.length - 1}
            >Next card
          </button>
        </div>
        <br/>
        <button id="card" onClick={this.flipCard}>
          {this.props.cards[this.state.i][fron]}
        </button>
        <br/>
        <p class="center" id="progress">
          Card {this.state.i + 1}/{this.props.cards.length}
        </p>
        {
          this.props.isLoggedIn ? 
          <button 
            class="save" 
            onClick={this.saveDeck} 
            > {
                this.props.saved && this.props.saved.indexOf(this.props.deck) !== -1 ?
                '★ Unsave deck' : '☆ Save deck'
              }
          </button>
          : ''
        }
        <br />
        <Link class="editor" to="/">Go to homepage</Link>
      </div>
    );
  }
}

const populates = [
  { child: 'owner', root: 'users' }
]

const mapStateToProps = (state, props) => {
  const deckID = props.match.params.deckID;
  const deck = state.firebase.data[deckID];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  const description = deck && deck.description;
  const isLoggedIn = state.firebase.auth.uid;
  const users = state.firebase.profile;
  const saved = users && state.firebase.profile.saved;
  return { cards: cards, 
           name: name, 
           description: description,
           deck: deckID,
           isLoggedIn: isLoggedIn,
           saved: saved,
           creator: populate(state.firebase, `data/${deckID}`, populates) };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    console.log('props', props);
    const deckID = props.match.params.deckID;
    return [{path: `/flashcards/${deckID}`, storeAs: deckID, populates}];
  }),
  connect(mapStateToProps),
)(CardViewer);