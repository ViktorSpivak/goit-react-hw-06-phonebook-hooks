import React, { Component } from "react";
import { connect } from "react-redux";
import * as phoneActions from "../../reduxElem/phoneActions";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import style from "./contactForm.module.css";
import styleAlert from "./alert.module.css";
import { v4 as uuidv4 } from "uuid";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    isExist: false,
  };

  numberValidation = (value) => {
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
  handleChange = (e) => {
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
      number: "",
    });
  }
  handleFindOverlap = (newName) =>
    this.props.contacts.some((contact) =>
      contact.name
        .toLowerCase()
        .split(" ")
        .some((name) => name === newName.toLowerCase())
    );
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    if (this.handleFindOverlap(name)) {
      this.setState({ isExist: true });
      this.clearSetState();
      return;
    }

    const newContact = { id: uuidv4(), name, number };
    name && number && this.props.onRecordAdd(newContact);
    this.clearSetState();
  };
  render() {
    const { name, number } = this.state;
    return (
      <div>
        <CSSTransition
          in={this.state.isExist}
          timeout={1500}
          classNames={styleAlert}
          onEntered={() =>
            setTimeout(() => this.setState({ isExist: false }), 1000)
          }
          unmountOnExit
        >
          <Alert variant="danger" className={styleAlert.alert}>
            Contact already exists!
          </Alert>
        </CSSTransition>

        <form onSubmit={this.handleSubmit} className={style.phoneBookForm}>
          <label htmlFor="nameForm" className={style.labelStyle}>
            Name
            <br />
            <input
              type="text"
              value={name}
              onChange={this.handleChange}
              name="name"
              id="nameForm"
            />
          </label>
          <label htmlFor="numberForm" className={style.labelStyle}>
            Number
            <br />
            <input
              type="text"
              value={number}
              onChange={this.handleChange}
              name="number"
              id="numberForm"
            ></input>
          </label>
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}
ContactForm.protoTypes = {
  onFindOverlap: PropTypes.func.isRequired,
  onCheckIn: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
});
const mapDispatchToProps = (dispatch) => ({
  onRecordAdd: (newRecord) => dispatch(phoneActions.recordAdd(newRecord)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
