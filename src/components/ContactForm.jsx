import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./contactform.module.css";
import { v4 as uuidv4 } from "uuid";
import { isValidPhoneNumber } from "react-phone-number-input";
export class ContactForm extends Component {
  state = {
    name: "",
    number: ""
  };
  nameFormId = uuidv4();
  numberFormId = uuidv4();
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  clearSetState() {
    this.setState({
      name: "",
      number: ""
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.props.onFindOverlap(name)) {
      alert(`${name} is already in contacts`);
      this.clearSetState();
      return;
    }
    if (!isValidPhoneNumber(number)) {
      alert("Wrong number, use format +12133734253 (11 numbers");
      this.clearSetState();
      return;
    }
    const newContact = { id: uuidv4(), name, number };
    this.props.onCheckIn(newContact);
    this.clearSetState();
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={style.phonebookForm}>
        <label htmlFor={this.nameFormId} className={style.labelStyle}>
          Name
          <br />
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            id={this.nameFormId}
          />
        </label>
        <label htmlFor={this.numberFormId} className={style.labelStyle}>
          Number
          <br />
          <input
            type="text"
            value={number}
            onChange={this.handleChange}
            name="number"
            id={this.numberFormId}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
ContactForm.protoTypes = {
  onFindOverlap: PropTypes.func.isRequired,
  onCheckIn: PropTypes.func.isRequired
};
export default ContactForm;
