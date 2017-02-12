import React from "react";
import Container from "../container";

import { Button, Col, ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem, PageHeader } from "react-bootstrap";

import { connect } from "react-redux";

import * as a from "../../store/actions.js";
import * as s from "../../store/selectors.js";

const Dashboard = (props) => {
    return (
        <Container>
            <Col sm={8} id="dashboard-main-content" className="text-left fill">
                <PageHeader>{props.connection || "Not connected."}<small>{props.connection}</small></PageHeader>
                <form>
                    <FormGroup controlId="addressInput">
                        <ControlLabel>Robot address</ControlLabel>
                        <FormControl
                            type="text"
                            defaultValue={props.form.addressInput || "roborio-4159-frc.local:5800"}
                            placeholder="Enter address"
                            onChange={props.handleUpdate}
                            />
                    </FormGroup>
                    <Button onClick={props.connect}>
                        Connect
                    </Button>
                </form>
            </Col>

            <Col sm={4} id="dashboard-side-content" className="sidenav fill">
                <h3>Match Log</h3>
                <ListGroup>
                    <ListGroupItem>Item 1</ListGroupItem>
                    <ListGroupItem>Item 2</ListGroupItem>
                    <ListGroupItem>...</ListGroupItem>
                </ListGroup>
            </Col>
        </Container>
  );
};

const mapStateToProps = (state) => ({
    form: s.getDashboardForm(state)
});

const mapDispatchToProps = (dispatch) => ({
    handleUpdate: (e) => dispatch(a.setDashboardForm({ [ e.target.id ]: e.target.value }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
