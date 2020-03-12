import React from "react";
import PropTypes from "prop-types";
const ContactList = ({ onShowFindRes, onDelete }) => (
  <div>
    <ul>
      {onShowFindRes.map(({ name, number, id }) => (
        <li key={id}>
          {name}:{number}
          <button id={id} onClick={onDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.protoTypes = {
  onShowFindRes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default ContactList;
