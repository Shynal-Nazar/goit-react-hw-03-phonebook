import React, { Component } from 'react';
import {
  PhoneSection,
  PhoneSectionName,
  PhoneForm,
  PhoneLabel,
  PhoneInput,
  PhoneBtn,
} from './Phonebook.styled';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class PhonebookSectionp extends Component {
  state = INITIAL_STATE;

  handleChange = (type, e) => {
    const { contacts } = this.props;
    if (type === 'name') {
      const contactInState = contacts.some(
        contact => contact.name.toLowerCase() === e.target.value.toLowerCase()
      );
      if (contactInState) {
        alert(`${contactInState.name} is already in contacts!`);
      }
    }
    this.setState({ [type]: e.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    const { contacts, onAddContact } = this.props;
    const contactInState = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    contactInState && alert(`${contactInState.name} is already in contacts!`);
    if (!contactInState && name && number) {
      onAddContact(name, number);
      this.setState(INITIAL_STATE);
      return;
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <PhoneSection>
        <PhoneSectionName>Phonebook</PhoneSectionName>
        <PhoneForm onSubmit={this.handleSubmit}>
          <PhoneLabel>
            Name
            <PhoneInput
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={evt => this.handleChange('name', evt)}
            />
          </PhoneLabel>
          <PhoneLabel>
            Number
            <PhoneInput
              type="text"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={evt => this.handleChange('number', evt)}
            />
          </PhoneLabel>
          <PhoneBtn type="submit">Add contacts</PhoneBtn>
        </PhoneForm>
      </PhoneSection>
    );
  }
}

export default PhonebookSectionp;

PhonebookSectionp.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onAddContact: PropTypes.func.isRequired,
};
