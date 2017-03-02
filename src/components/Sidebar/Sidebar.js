import React, { PropTypes } from "react";

import "./Sidebar.css";

export default function Sidebar( { charts, setActiveChartIndex } ) {
	return (
		<aside className="sidebar">
			<h3 className="sidebar__title">Past Charts</h3>

			<ul className="sidebar__past-charts">
				<li className="sidebar__past-chart">
					<p className="sidebar__chart-name">
						Example Chart
					</p>
					<p className="sidebar__chart-datasets">2 Datasets</p>
				</li>
			</ul>
		</aside>
	);
}

Sidebar.propTypes = {
	  charts: PropTypes.arrayOf( PropTypes.object ).isRequired
	, setActiveChartIndex: PropTypes.func.isRequired
};
