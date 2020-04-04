import React, { Component } from "react";
import PropTypes from "prop-types";
import * as phoneActions from "../reduxElem/phoneActions";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import style from "./contactList.module.css";
import { connect } from "react-redux";

class ContactList extends Component {
  handleFindContacts = () => {
    if (this.props.filter) {
      return this.props.contacts.filter((contact) =>
        contact.name
          .toLowerCase()
          .split(" ")
          .some((name) => name.startsWith(this.props.filter.toLowerCase()))
      );
    } else {
      return this.props.contacts;
    }
  };

  render() {
    const searchList = this.handleFindContacts();
    return (
      <div>
        <ListGroup>
          <TransitionGroup className="todo-list">
            {searchList.map(({ name, number, id }) => (
              <CSSTransition key={id} timeout={250} classNames={style}>
                <ListGroup.Item>
                  <Row>
                    <Col className={style.todo}>{name}</Col>
                    <Col sm="auto" className={style.todo}>
                      {number}
                    </Col>
                    <Col sm="2">
                      <Button
                        variant="danger"
                        size="sm"
                        id={id}
                        onClick={this.props.onRecordRemove}
                      >
                        &times;
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </div>
    );
  }
}

ContactList.protoTypes = {
  onShowFindRes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
  filter: state.filter,
});
const mapDispatchToProps = (dispatch) => ({
  onRecordRemove: (ev) => dispatch(phoneActions.recordRemove(ev.target.id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
