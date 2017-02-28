/*
This component is already completed, you should not need to make any changes here.
It expects a "chart" object as a prop. The chart object should have two properties
1: Labels: An array of strings.
2: Datasets: An array of numbers
*/


import React, { Component, PropTypes } from "react";
import Chart from "chart.js";

import "./ActiveChart.css";

export default class ActiveChart extends Component {
	static propTypes = { chart: PropTypes.object.isRequired };

	constructor( props ) {
		super( props );

		this.chart = null;
	}

	componentDidMount() {
		this.chart = new Chart( this.canvas, {
			  type: 'radar'
			, data: {
				  labels: this.props.chart.labels
				, datasets: this.props.chart.datasets.map( this.addColorToDatasets )
			}
			, options: {
				maintainAspectRatio: false
			}
		} );
	}

	componentDidUpdate() {
		this.chart.data.labels = this.props.chart.labels;
		this.chart.data.datasets = this.props.chart.datasets.map( this.addColorToDatasets );
		this.chart.update();
	}

	addColorToDatasets( dataset ) {
		const randomColor = [
			  Math.floor( Math.random() * 255 )
			, Math.floor( Math.random() * 255 )
			, Math.floor( Math.random() * 255 )
		].join( "," );

		return Object.assign( dataset, {
			  backgroundColor: `rgba(${ randomColor }, 0.2)`
			, borderColor: `rgba(${ randomColor }, 1)`
			, pointBackgroundColor: `rgba(${ randomColor }, 1)`
			, pointBorderColor: "#ffffff"
			, pointHoverBackgroundColor: "#ffffff"
			, pointHoverBorderColor: `rgba(${ randomColor }, 1)`
		} );
	}

	render() {
		return (
			<div className="active-chart">
				<canvas width={ 400 } ref={ canvas => this.canvas = canvas } />
			</div>
		);
	}
}
