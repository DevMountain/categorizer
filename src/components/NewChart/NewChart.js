import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
	static propTypes = { createChart: PropTypes.func.isRequired };

	render() {
		return (
			<div className="new-chart">
				<div className="new-chart__form-group">
					<label className="new-chart__label">Chart Name:</label>
					<input
						className="new-chart__name new-chart__input"
						type="text"
					/>
				</div>
				<form className="new-chart__form-group">
					<label className="new-chart__label">Add Label:</label>
					<input
						className="new-chart__category new-chart__input"
						required
						type="text"
					/>
				</form>

				<div className="new-chart__labels-wrapper">
					<label className="new-chart__label">Labels:</label>
					<span className="new-chart__labels">[](Min. 3)</span>
				</div>

				<button className="new-chart__submit">
					Submit
				</button>
			</div>
		);
	}
}
