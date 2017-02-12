import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { remote } from "electron";

import * as a from "../store/actions.js";
import * as s from "../store/selectors.js";

const window = remote.getCurrentWindow();

const Header = (props) => {
    return (
        <Navbar id="title-bar">
            <Navbar.Header>
                <Navbar.Brand>
                    CardinalDash
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/dashboard"><NavItem eventKey={1}>Dashboard</NavItem></LinkContainer>
                <LinkContainer to="/logs"><NavItem eventKey={2}>Graphs</NavItem></LinkContainer>
                <LinkContainer to="/settings"><NavItem eventKey={3}>Settings</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight id="title-bar-btns">
                <NavItem eventKey={1} id="dev-btn" onClick={toggleDev}>DEV</NavItem>
                <NavItem eventKey={2} id="min-btn" onClick={minimize}>-</NavItem>
                <NavItem eventKey={3} id="max-btn" onClick={maximize}>+</NavItem>
                <NavItem eventKey={4} id="close-btn" onClick={close}>x</NavItem>
            </Nav>
        </Navbar>
    );
};

const toggleDev = () => {
  window.toggleDevTools();
};

const minimize = () => {
  window.minimize();
};

const maximize = () => {
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
};

const close = () => {
  var dialog = require('electron').remote.dialog;
  var choice = dialog.showMessageBox(
  remote.getCurrentWindow(),
  {
  type: 'question',
  buttons: ['Yes', 'No'],
  title: 'Confirm',
  message: 'Are you sure you want to close?'
  });

  if(choice === 0 )
    window.close();
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
