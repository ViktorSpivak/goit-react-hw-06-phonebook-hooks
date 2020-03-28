import React, { Component } from "react";
import ContactForm from "../contactform/ContactForm";
import Filter from "../filtr/Filter";
import ContactList from "../contactlist/ContactList";
import { CSSTransition } from "react-transition-group";
import style from "./app.module.css";

export class Phonebook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      { id: "id-5", name: "ennie kopeland", number: "227-91-26" }
    ],
    filter: "",
    isAnimation: false
  };

  componentDidUpdate() {
    localStorage.setItem("contacts", `${JSON.stringify(this.state.contacts)}`);
  }
  componentDidMount() {
    const contactsFromStorage = JSON.parse(localStorage.getItem("contacts"));
    contactsFromStorage && this.setState({ contacts: contactsFromStorage });
  }

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
      <div className={style.container}>
        <CSSTransition
          in={this.state.isAnimation}
          timeout={500}
          classNames={style}
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <ContactForm
          onCheckIn={this.handleCheckIn}
          onFindOverlap={this.handleFindOverlap}
        />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 && (
          <Filter onFindContact={this.handleChangeFilter}></Filter>
        )}
        <ContactList
          onShowFindRes={this.handleFindContacts()}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default Phonebook;
