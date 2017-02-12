import React from "react";
import Container from "../container";

import { Col } from "react-bootstrap";

const Logs = () => {
    return (
        <Container>
            <Col sm={12}>
                <h2>Pretty graphs</h2>
                <button id="load-btn" type="button" className="btn btn-default">Load JSON file</button>
            </Col>
        </Container>
  );
};

export default Logs;
