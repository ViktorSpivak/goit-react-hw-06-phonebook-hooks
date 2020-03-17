import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./contactform.module.css";
import { v4 as uuidv4 } from "uuid";

export class ContactForm extends Component {
  state = {
    name: "",
    number: ""
  };
  nameFormId = uuidv4();
  numberFormId = uuidv4();
  numberValidation = value => {
    const lastSymbolAdd = value.split("").pop();
    const isNumberValid = value.length < 10 && Number(lastSymbolAdd);
    const isDeletePush = value.length < this.state.number.length;
    if (isDeletePush) {
      this.setState({ number: value });
    } else {
      if (isNumberValid || isNumberValid === 0) {
        const phoneNumLength = value.length;
        if (phoneNumLength === 4 || phoneNumLength === 7) {
          let x = value.split("");
          x.splice(phoneNumLength - 1, 0, "-");
          x = x.join("");
          value = x;
        }
        this.setState({ number: value });
      }
    }
  };
  handleChange = e => {
    let { name, value } = e.target;
    if (name === "number") {
      this.numberValidation(value);
    } else {
      this.setState({ [name]: value });
    }
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
          ></input>
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
