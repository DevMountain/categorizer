import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";

import AddDataset from "./AddDataset";

test( "AddDataset allows for changing the Label input", () => {
	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	expect( addDataset.state().label ).toBe( "" );

	addDataset
		.find( ".add-dataset__input" )
		.first()
		.simulate( "change", { target: { value: "Foo" } } );

	expect( addDataset.state().label ).toBe( "Foo" );
} );

test( "AddDataset displays a different number of inputs based on props.labels.length", () => {
	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	expect( addDataset.find( ".add-dataset__input" ).length ).toBe( 4 );
} );

test( "AddDataset sets state.data based on props.labels.length", () => {
	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	expect( addDataset.state().data ).toEqual( [ 0, 0, 0 ] );

	addDataset.setProps( { labels: [ "Foo", "Bar", "Baz", "Qux" ] } );

	expect( addDataset.state().data ).toEqual( [ 0, 0, 0, 0 ] );
} );

test( "AddDataset allows for changing data inputs", () => {
	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	addDataset
		.find( ".add-dataset__input" )
		.at( 2 )
		.simulate( "change", { target: { value: "20" } } );

	expect( addDataset.state().data[ 1 ] ).toEqual( 20 );
} );

test( "AddDataset.handleSubmit calls event.preventDefault", () => {
	const preventDefaultSpy = sinon.spy();

	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	addDataset.simulate( "submit", { preventDefault: preventDefaultSpy } );

	sinon.assert.calledOnce( preventDefaultSpy );
} );

test( "AddDataset.handleSubmit calls props.addDataset", () => {
	const addDatasetSpy = sinon.spy();

	const addDataset = shallow(
		<AddDataset
			addDataset={ addDatasetSpy }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	addDataset.setState( { label: "Test" } );

	addDataset.simulate( "submit", { preventDefault() {} } );

	sinon.assert.calledOnce( addDatasetSpy );
	expect( addDatasetSpy.firstCall.args[ 0 ] ).toEqual( { data: [ 0, 0, 0 ], label: "Test" } );
} );

test( "AddDataset.handleSubmit resets to initial state after submit", () => {
	const addDataset = shallow(
		<AddDataset
			addDataset={ () => null }
			labels={ [ "Foo", "Bar", "Baz" ] }
		/>
	);

	addDataset.setState( { label: "Test" } );

	addDataset.simulate( "submit", { preventDefault() {} } );

	expect( addDataset.state() ).toEqual( { data: [ 0, 0, 0 ], label: "" } );
} );
