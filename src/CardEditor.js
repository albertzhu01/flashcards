import React from 'react';
import './CardEditor.css';

import { Link, withRouter, Redirect } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from 'redux';
import { connect } from 'react-redux';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'Example Front', back: 'Example Back', editingF: false, editingB: false },
        { front: 'Kirby', back: "Pink Ball of Fun", editingF: false, editingB: false },
      ],
      front: '', 
      back: '',
      editFront: '', 
      editBack: '',
      name: '',
      desc: '',
      visibility: false,
    };
  }

  addCard = () => {
    if (this.state.front.trim() !== '' && this.state.back.trim() !== '') {
      const newCard = { front: this.state.front, 
                        back: this.state.back, 
                        editingF: false,
                        editingB: false };
      const cards = this.state.cards.slice().concat(newCard);
      this.setState({ cards, front: '', back: '' });
    }
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  editFront = (index, oldCard, editF) => {
    let newCard = {};
    if (editF && this.state.editFront.trim() !== '') {
      newCard = { front: this.state.editFront,
                  back: oldCard.back,
                  editingF: !editF,
                  editingB: oldCard.editingB }
      const cards = this.state.cards.slice();
      cards[index] = newCard;
      this.setState({ cards });
    } else {
      newCard = { front: oldCard.front,
                  back: oldCard.back,
                  editingF: !editF,
                  editingB: oldCard.editingB }
      const cards = this.state.cards.slice();
      cards[index] = newCard;
      this.setState({ cards });
    }
  };

  editBack = (index, oldCard, editB) => {
    let newCard = {};
    if (editB && this.state.editBack.trim() !== '') {
      newCard = { front: oldCard.front,
                  back: this.state.editBack,
                  editingF: oldCard.editingF,
                  editingB: !editB }
      const cards = this.state.cards.slice();
      cards[index] = newCard;
      this.setState({ cards });
    } 
    else {
      newCard = { front: oldCard.front,
                  back: oldCard.back,
                  editingF: oldCard.editingF,
                  editingB: !editB }
      const cards = this.state.cards.slice();
      cards[index] = newCard;
      this.setState({ cards });
    }
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleCheckboxChange = event =>
    this.setState({ [event.target.name]: event.target.checked })

  createDeck = () => {
    const deckID = this.props.firebase.push('/flashcards').key;
    const updates = {};
    const newDeck = { cards: this.state.cards, 
                      name: this.state.name, 
                      description: this.state.desc,
                      visibility: this.state.visibility,
                      owner: this.props.isLoggedIn
                    };
    updates[`/flashcards/${deckID}`] = newDeck;
    updates[`/homepage/${deckID}`] = { name: this.state.name, 
                                       description: this.state.desc,
                                       visibility: this.state.visibility,
                                       owner: this.props.isLoggedIn };
    const onComplete = () => {
      console.log('database updated!');
      this.props.history.push(`/viewer/${deckID}`);
    };
    this.props.firebase.update('/', updates, onComplete);
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/register" />
    }
    const cards = this.state.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {card.front}
            <br />
            <button 
              onClick={() => this.editFront(index, card, card.editingF)}
              class="editButton"
              >
              {card.editingF ? 'Update' : 'Edit'}
            </button>
            <input
              class='user'
              hidden={!card.editingF}
              name='editFront'
              onChange={this.handleChange}
              placeholder='New front'
              maxLength='200'
              value={this.state.editFront}
              >
            </input>
          </td>
          <td>
            {card.back}
            <br />
            <button 
              onClick={() => this.editBack(index, card, card.editingB)}
              class="editButton"
              >
              {card.editingB ? 'Update' : 'Edit'}
            </button>
            <input
              class='user'
              hidden={!card.editingB}
              name='editBack'
              onChange={this.handleChange}
              placeholder='New back'
              maxLength='200'
              value={this.state.editBack}
              >
            </input>
          </td>
          <td>
            <button 
              class="del"
              onClick={() => this.deleteCard(index)}>
              Delete card
            </button>
          </td>
        </tr>
      );
    });
    
    return (
      <div>
        <img id="kirby" src={require('./FlashCards.png')} alt="Kirbs!"/>
        <h1 class="center">Card Editor</h1>
        <div class="center">
          Deck name:{' '}
          <input
            class="user" 
            name="name" 
            onChange={this.handleChange} 
            placeholder="Name of Deck" 
            maxLength='100'
            value={this.state.name}/>
          Deck description: {' '}
          <input 
            class="user"
            name="desc"
            onChange={this.handleChange}
            placeholder="Description (Optional)"
            maxLength='200'
            value={this.state.desc}
          />
        </div>
        <br/>
        <table>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <div class="center">
          <input 
            class="user"
            name="front"
            onChange={this.handleChange}
            placeholder="Front of card"
            maxLength='200'
            value={this.state.front}
          />
          <input 
            class="user"
            name="back"
            onChange={this.handleChange}
            placeholder="Back of card"
            maxLength='200'
            value={this.state.back}
          />
          <button class="adddel" onClick={this.addCard}>Add card</button>
        </div>
        <br/>
        <div class="center">
          <input 
            type="checkbox" 
            name="visibility"
            onChange={this.handleCheckboxChange} 
            value={this.state.visibility}
          />
          <label for="visibility">Make public?</label>
        </div>
        <br/>
        <div class="center">
          <button 
            disabled={!this.state.name.trim() || this.state.cards.length === 0}
            onClick={this.createDeck}
            class="adddel"
            >
            Create Deck
          </button>
        </div>
        <br/>
        <br/>
        <Link class="editor" to="/">Go to homepage</Link>
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
  withRouter)
(CardEditor);