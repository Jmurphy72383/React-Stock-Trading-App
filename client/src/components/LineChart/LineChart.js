import React from 'react';
import {Line} from 'react-chartjs-2';
import "./LineChart.css";

const LineChart = props => (
    <div className="line_chart">
        <Line
            data={props.data}
            options={props.options}
        />
    </div>
);

export default LineChart;