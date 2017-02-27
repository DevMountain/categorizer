import React, { Component, PropTypes } from "react";

import "./AddDataset.css";

export default class AddDataset extends Component {
	static get propTypes() {
		return {
			  addDataset: PropTypes.func.isRequired
			, labels: PropTypes.arrayOf( PropTypes.string ).isRequired
		}
	}

	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<form className="add-dataset">
				<h3 className="add-dataset__header">Add Dataset</h3>
				<div className="add-dataset__form-group">
					<label className="add-dataset__label">Dataset Label:</label>
					<input
						className="add-dataset__input"
						required
						type="text"
					/>
				</div>
				<button
					className="add-dataset__submit"
					type="submit"
				>
					Submit
				</button>
			</form>
		);
	}
}
