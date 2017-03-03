import React, { Component, PropTypes } from "react";

import "./AddDataset.css";

export default class AddDataset extends Component {
	static propTypes = {
		  addDataset: PropTypes.func.isRequired
		, labels: PropTypes.arrayOf( PropTypes.string ).isRequired
	};

	constructor( props ) {
		super( props );

		this.state = {
			  data: new Array( props.labels.length ).fill( 0 )
			, label: ""
		};

		this.handleLabelChange = this.handleLabelChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps !== this.props ) {
			this.setState( { data: new Array( nextProps.labels.length ).fill( 0 ) } );
		}
	}

	handleDataChange( changedIndex, event ) {
		const { data } = this.state;
		this.setState( {
			data: [
				  ...data.slice( 0, changedIndex )
				, parseInt( event.target.value, 10 )
				, ...data.slice( changedIndex + 1, data.length )
			]
		} );
	}

	handleLabelChange( event ) {
		this.setState( { label: event.target.value } );
	}

	handleSubmit( event ) {
		event.preventDefault();

		const { data, label } = this.state;
		const { addDataset, labels } = this.props;

		addDataset( { data: data.map( datum => parseInt( datum, 10 ) ), label } );

		this.setState( {
			  data: new Array( labels.length ).fill( 0 )
			, label: ""
		} );
	}

	render() {
		const { labels } = this.props;
		const { data, label } = this.state;

		const labelInputs = labels.map( ( label, index ) => (
			<div
				className="add-dataset__form-group"
				key={ label }
			>
				<label className="add-dataset__label">{ label }:</label>
				<input
					className="add-dataset__input"
					max="100"
					min="0"
					onChange={ this.handleDataChange.bind( this, index ) }
					required
					type="number"
					value={ data[ index ] }
				/>
			</div>
		) );

		return (
			<form
				className="add-dataset"
				onSubmit={ this.handleSubmit }
			>
				<h3 className="add-dataset__header">Add Dataset</h3>
				<div className="add-dataset__form-group">
					<label className="add-dataset__label">Dataset Label:</label>
					<input
						className="add-dataset__input"
						onChange={ this.handleLabelChange }
						required
						type="text"
						value={ label }
					/>
				</div>
				{ labelInputs }
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
