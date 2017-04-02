import React from "react";
import Container from "../container";

import { Button, Col, ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem, PageHeader, Panel, Table } from "react-bootstrap";

import { connect } from "react-redux";

import * as a from "../../store/actions.js";
import * as s from "../../store/selectors.js";

var maxTotalCurrent = 0;

var maxCurrent = Array(16);
maxCurrent.fill(0);

const Dashboard = (props) => {
    const connect = () => props.connect(props.form.addressInput);
    const disconnect = () => props.disconnect();

    if (props.data.PDP) {
        for (let i = 0;i < 16;i++)
            if (props.data.PDP.Current[ i ] > maxCurrent[ i ])
                maxCurrent[ i ] = props.data.PDP.Current[ i ];
        if (getCurrent(props.data) > maxTotalCurrent)
            maxTotalCurrent = getCurrent(props.data);
    }

    const listItems = Array(17);
    for (let i = 0;i < 16;i++)    {
        listItems[ i ] = (
            <tr key={i}>
                <td key={i * 3}>{i}</td>
                <td key={i * 3 + 1}>{getCurrentPort(props.data, i)}</td>
                <td key={i * 3 + 2}>{getMaxCurrentPort(props.data, i)}</td>
            </tr>
        );
    }
    listItems[ 16 ] = (
        <tr key={16}>
            <td>Total</td>
            <td>{getCurrent(props.data)}</td>
            <td>{getMaxCurrent()}</td>
        </tr>
    );

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
                            <ListGroupItem>Mode: {getState(props.data)}</ListGroupItem>
                            <ListGroupItem>State: {getEnabled(props.data) ? "Enabled" : "Disabled"}</ListGroupItem>
                        </ListGroup>
                    </Panel>
                    <Panel header="Pistons">
                        <ListGroup fill>
                            <ListGroupItem>Item 0</ListGroupItem>
                            <ListGroupItem>Item 1</ListGroupItem>
                            <ListGroupItem>Item 2</ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>

                <Col sm={2}>
                    <Panel header="Current">
                        <Table striped bordered condensed hover responsive>
                            <thead>
                                <tr>
                                    <th key={0}>Port</th>
                                    <th key={1}>Current</th>
                                    <th key={2}>Peak</th>
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
    if (data.PDP)
        return Number(data.PDP.Voltage).toFixed(2);
};

const getCurrent = (data) => {
    if (data.PDP)    {
        let current = 0;
        for (let i = 0;i < 16;i++)
            current += data.PDP.Current[ i ];

        return Number(current).toFixed(2);
    }
};

const getMaxCurrent = () => {
    return Number(maxTotalCurrent).toFixed(2);
};


const getCurrentPort = (data, port) => {
    if (data.PDP)
        return Number(data.PDP.Current[ port ]).toFixed(2);
};

const getMaxCurrentPort = (data, port) => {
    if (data.PDP)
        return Number(maxCurrent[ port ]).toFixed(2);
};

const getState = (data) => {
    if (data.RoboRIO)
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
    if (data.RoboRIO)
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
