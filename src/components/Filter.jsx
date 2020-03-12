import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./contactform.module.css";
import { v4 as uuidv4 } from "uuid";
export default class Filter extends Component {
  state = {
    filter: ""
  };
  findFormId = uuidv4();
  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
    this.props.onFindContact(e.target.value);
  };
  render() {
    const { filter } = this.state;
    return (
      <label htmlFor={this.findFormId} className={style.labelStyle}>
        Find contacts by name
        <br />
        <input
          type="text"
          value={filter}
          onChange={this.handleChangeFilter}
          id={this.findFormId}
        />
      </label>
    );
  }
}
Filter.protoTypes = {
  onFindContact: PropTypes.func.isRequired
};
