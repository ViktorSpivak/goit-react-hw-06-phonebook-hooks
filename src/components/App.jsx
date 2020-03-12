import React, { Component } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

export class Phonebook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      { id: "id-5", name: "ennie kopeland", number: "227-91-26" }
    ],
    filter: ""
  };
  handleFindOverlap = newName =>
    this.state.contacts.some(contact =>
      contact.name
        .toLowerCase()
        .split(" ")
        .some(name => name === newName.toLowerCase())
    );
  handleChangeFilter = value => {
    this.setState({ filter: value });
  };
  handleFindContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .split(" ")
        .some(name => name.startsWith(this.state.filter.toLowerCase()))
    );
  handleDeleteContact = ev => {
    ev.persist();
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== ev.target.id)
    }));
  };
  handleCheckIn = newContact => {
    this.setState(state => ({
      contacts: [...state.contacts, newContact]
    }));
  };
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onCheckIn={this.handleCheckIn}
          onFindOverlap={this.handleFindOverlap}
        />
        <h2>Contacts</h2>
        <Filter onFindContact={this.handleChangeFilter} />
        <ContactList
          onShowFindRes={this.handleFindContacts()}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default Phonebook;
