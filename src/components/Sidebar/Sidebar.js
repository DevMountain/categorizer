import React, { PropTypes } from "react";

import "./Sidebar.css";

export default function Sidebar( { charts, setActiveChartIndex } ) {
	const pastCharts = charts.map( ( chart, index ) => (
		<li
			className="sidebar__past-chart"
			key={ chart.name }
		>
			<p
				className="sidebar__chart-name"
				onClick={ () => setActiveChartIndex( index ) }
			>
				{ chart.name }
			</p>
			<p className="sidebar__chart-datasets">{ chart.datasets.length } Datasets</p>
		</li>
	) );
	return (
		<aside className="sidebar">
			<h3 className="sidebar__title">Past Charts</h3>

			<ul className="sidebar__past-charts">
				{ pastCharts }
			</ul>
		</aside>
	);
}

Sidebar.propTypes = {
	  charts: PropTypes.arrayOf( PropTypes.object ).isRequired
	, setActiveChartIndex: PropTypes.func.isRequired
};
