import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import style from "./contactlist.module.css";

const ContactList = ({ onShowFindRes, onDelete }) => (
  <div>
    <ListGroup>
      <TransitionGroup className="todo-list">
        {onShowFindRes.map(({ name, number, id }) => (
          <CSSTransition key={id} timeout={250} classNames={style}>
            <ListGroup.Item>
              <Row>
                <Col className={style.todo}>{name}</Col>
                <Col sm="auto" className={style.todo}>
                  {number}
                </Col>
                <Col sm="2">
                  <Button variant="danger" size="sm" id={id} onClick={onDelete}>
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

ContactList.protoTypes = {
  onShowFindRes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default ContactList;
