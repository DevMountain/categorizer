import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { createChart, setActiveChartIndex } from "../ducks/chart";

import ActiveChart from "./ActiveChart/ActiveChart";
import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
	render() {
		const {
			  activeChart
			, charts
			, createChart
			, setActiveChartIndex
		} = this.props;

		return (
			<div className="app">
				<Sidebar
					charts={ charts }
					setActiveChartIndex={ setActiveChartIndex }
				/>
				<main className="app__main">
					<header className="app__header">
						<h1 className="app__title">Categorizer</h1>

						<div className="app__new-chart">
							<NewChart createChart={ createChart } />
						</div>
					</header>
					<div className="app__active-chart">
						<ActiveChart chart={ activeChart } />
					</div>
				</main>
			</div>
		);
	}
}

function mapStateToProps( { activeChartIndex, charts } ) {
	return {
		  activeChart: charts[ activeChartIndex ]
		, charts
	};
}

export default connect( mapStateToProps, { createChart, setActiveChartIndex } )( App );
