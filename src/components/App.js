import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
	render() {
		return (
			<div className="app">
				<Sidebar />
				<main className="app__main">
					<header className="app__header">
						<h1 className="app__title">Categorizer</h1>

						<div className="app__new-chart">
							<NewChart />
						</div>
					</header>
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

export default connect( mapStateToProps )( App );
