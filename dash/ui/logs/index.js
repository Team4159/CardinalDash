import React from "react";
import Container from "../container";

import { Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";
import { remote } from "electron";
//const { dialog } = require("electron").remote;


import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

const Logs = () => {
    let data = [
        {
            type: "lines",
            x: [1, 2, 3],
            y: [6, 2, 3],
            name: "Port 0"
        },
        {
            type: "lines",
            x: [1, 2, 3],
            y: [8, 19, 4],
            name: "Port 1"
        }
    ];
    let layout = {
        autosize: true,
        title: "Current",
        xaxis: {
            title: "time"
        },
        yaxis: {
            title: "current (A)"
        },
        font: {
            family: '"Lato","Helvetica Neue",Helvetica,Arial,sans-serif',
            color: "#ebebeb"
        },
        paper_bgcolor: "#4e5d6c"
        //plot_bgcolor: 'rgba(0,0,0,0)'
    };
    let config = {
        showLink: false,
        displayModeBar: false
    };
    return (
        <Container>
            <Col sm={12} className="text-left fill">
                <h2>Pretty graphs</h2>
                <form>
                    <Button onClick={() => { console.log(remote.dialog.showOpenDialog({properties: ['openFile']})) }}>
                        Open Log File
                    </Button>
                </form>

                <PlotlyComponent className="currentPlot" data={data} layout={layout} config={config}/>
            </Col>
        </Container>
    );
  //   return (
  //       <Container>
  //           <Col sm={12}>
  //               <h2>Pretty graphs</h2>
  //               <button id="load-btn" type="button" className="btn btn-default">Load JSON file</button>
  //           </Col>
  //       </Container>
  // );
};

export default Logs;
