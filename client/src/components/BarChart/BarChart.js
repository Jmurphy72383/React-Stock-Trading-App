import React from 'react';
import {Bar} from 'react-chartjs-2';
import "./BarChart.css";

const BarChart = props => (
    <div className="bar_chart">
        <Bar
            data={props.data}
            options={props.options}
        />
    </div>
);

export default BarChart;