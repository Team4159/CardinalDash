import React from "react";
import Container from "../container";

import { Button, Col, ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem, PageHeader } from "react-bootstrap";

import { connect } from "react-redux";

import * as a from "../../store/actions.js";
import * as s from "../../store/selectors.js";

const headerMessage = (props) => {
    if(props.status.connected)
        return "Connected";
    if(props.status.connecting)
        return "Connecting..."
    return "Not connected."
}

const Dashboard = (props) => {
    const connect = () => props.connect(props.form.addressInput);
    const currentData = props.data[props.data.length - 1];

    return (
        <Container>
            <Col sm={8} id="dashboard-main-content" className="text-left fill">
                <PageHeader>{headerMessage(props)}
                    <small>{props.status.connected ? props.status.address : ""}</small>
                </PageHeader>
                <form>
                    <FormGroup controlId="addressInput">
                        <ControlLabel>Robot address</ControlLabel>
                        <FormControl
                            type="text"
                            defaultValue={props.form.addressInput}
                            placeholder="Enter address"
                            onChange={props.handleUpdate}
                            />
                    </FormGroup>
                    <Button onClick={connect} disabled={props.status.connecting}>
                        Connect
                    </Button>
                </form>
            </Col>

            <Col sm={4} id="dashboard-side-content" className="sidenav fill">
                <h3>Match Log</h3>
                <ListGroup>
                    <ListGroupItem>Item 1</ListGroupItem>
                    <ListGroupItem>Item 2</ListGroupItem>
                    <ListGroupItem>{
                        props.data.data.PDP.Voltage
                    }</ListGroupItem>
                </ListGroup>
            </Col>
        </Container>
  );
};

const mapStateToProps = (state) => ({
    form: s.getDashboardForm(state),
    status: s.getStatus(state),
    data: s.getData(state)
});

const mapDispatchToProps = (dispatch) => ({
    handleUpdate: (e) => dispatch(a.setDashboardForm({ [ e.target.id ]: e.target.value })),
    connect: (ip) => dispatch(a.robotConnect({address: ip}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
