import React from "react";
import Container from "../container";

import { Button, Col, ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem, PageHeader, Panel, Table } from "react-bootstrap";

import { connect } from "react-redux";

import * as a from "../../store/actions.js";
import * as s from "../../store/selectors.js";

var maxCurrent = Array(16);
maxCurrent.fill(0);

const Dashboard = (props) => {
    const connect = () => props.connect(props.form.addressInput);
    const disconnect = () => props.disconnect();

    for (let i = 0;i < 16;i++)
        if (props.data.PDP.Current[ i ] > maxCurrent[ i ])
            maxCurrent[ i ] = props.data.PDP.Current[ i ];

    const listItems = Array(16);
    for (let i = 0;i < 16;i++)    {
        listItems[ i ] = (
            <tr>
                <td>{i}</td>
                <td>{getCurrentPort(props.data, i)}</td>
                <td>{getMaxCurrentPort(props.data, i)}</td>
            </tr>
        );
    }

    return (
        <Container>
            <Col sm={8} id="dashboard-main-content" className="text-left fill">
                <Col sm={12}>
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
                        <Button onClick={connect} disabled={props.status.connecting || props.status.connected}>
                            Connect
                        </Button>
                        <Button onClick={disconnect} disabled={!props.status.connected}>
                            Disconnect
                        </Button>
                    </form>
                </Col>
                <Col sm={12}>
                    <br />
                </Col>
                <Col sm={2}>
                    <Panel header="Robot Status">
                        <ListGroup fill>
                            <ListGroupItem>Voltage: {getVoltage(props.data)}V</ListGroupItem>
                            <ListGroupItem>Current: {getCurrent(props.data)}A</ListGroupItem>
                            <ListGroupItem>Mode: {getState(props.data)}</ListGroupItem>
                            <ListGroupItem>State: {getEnabled(props.data) ? "Enabled" : "Disabled"}</ListGroupItem>
                        </ListGroup>
                    </Panel>
                    <Panel header="Pistons">
                        <ListGroup fill>
                            <ListGroupItem>Item 1</ListGroupItem>
                            <ListGroupItem>Item 2</ListGroupItem>
                            <ListGroupItem></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>

                <Col sm={2}>
                    <Panel header="Current">
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Port</th>
                                    <th>Current</th>
                                    <th>Peak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItems}
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
            </Col>

            <Col sm={4} id="dashboard-side-content" className="sidenav fill">
                <h3>Match Log</h3>
                <ListGroup>
                    <ListGroupItem>Event data</ListGroupItem>
                </ListGroup>
            </Col>
        </Container>
  );
};

const headerMessage = (props) => {
    if (props.status.connected)
        return "Connected";
    if (props.status.connecting)
        return "Connecting...";
    return "Not connected.";
};

const getVoltage = (data) => {
    if (data)
        return Number(data.PDP.Voltage).toFixed(2);
};

const getCurrent = (data) => {
    if (data)    {
        let current = 0;
        for (let i = 0;i < 16;i++)
            current += data.PDP.Current[ i ];

        return Number(current).toFixed(2);
    }
};

const getCurrentPort = (data, port) => {
    if (data)
        return Number(data.PDP.Current[ port ]).toFixed(2);
};

const getMaxCurrentPort = (data, port) => {
    if (data)
        return Number(maxCurrent[ port ]).toFixed(2);
};

const getState = (data) => {
    if (data)
    switch (data.RoboRIO.Mode) {
        case 0:
            return "Disabled";
        case 1:
            return "Teleop";
        case 2:
            return "Auto";
        case 3:
            return "Test";
        default:
            return "Unknown";
    }
};

const getEnabled = (data) => {
    if (data)
        return data.RoboRIO.Enabled;
};

const mapStateToProps = (state) => ({
    form: s.getDashboardForm(state),
    status: s.getStatus(state),
    data: s.getData(state)
});

const mapDispatchToProps = (dispatch) => ({
    handleUpdate: (e) => dispatch(a.setDashboardForm({ [ e.target.id ]: e.target.value })),
    connect: (ip) => dispatch(a.robotConnect({ address: ip })),
    disconnect: () => dispatch(a.robotDisconnect())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
