import React from "react";
import Container from "../container";

import { Button, Col } from "react-bootstrap";

const Settings = () => {
    return (
        <Container>
        <br />
            <Col sm={7}>
                <p>Hello settingss world!</p>
            </Col>
            <Col sm={5}>
                <p><Button onClick={installDevtron}>Install Electron Devtron</Button></p>
                <p><Button onClick={installReactDevtools}>Install React DevTools</Button></p>
            </Col>
        </Container>
  );
};

const installDevtron = () => {
    eval("require('devtron').install()");
};

const installReactDevtools = () => {
    eval("require('electron-react-devtools').install()");
};

export default Settings;
