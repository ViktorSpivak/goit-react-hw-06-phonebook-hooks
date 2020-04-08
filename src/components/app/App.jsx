import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactForm from "../contactform/ContactForm";
import Filter from "../filtr/Filter";
import ContactList from "../contactlist/ContactList";
import { CSSTransition } from "react-transition-group";
import style from "./app.module.css";

export class Phonebook extends Component {
  state = {
    isAnimation: false,
  };

  componentDidMount() {
    this.setState({ isAnimation: true });
  }

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
        <ContactForm />
        <Filter></Filter>
        <ContactList />
      </div>
    );
  }
}

export default Phonebook;
