import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";

import NewChart from "./NewChart";

test( "NewChart allows for changing the name input", () => {
	const newChart = shallow( <NewChart createChart={ () => null } /> );

	expect( newChart.state().name ).toBe( "" );

	newChart
		.find( ".new-chart__name" )
		.simulate( "change", { target: { value: "Foo" } } );

	expect( newChart.state().name ).toBe( "Foo" );
} );

test( "NewChart allows for changing the label input", () => {
	const newChart = shallow( <NewChart createChart={ () => null } /> );

	expect( newChart.state().newLabel ).toBe( "" );

	newChart
		.find( ".new-chart__category" )
		.simulate( "change", { target: { value: "Foo" } } );

	expect( newChart.state().newLabel ).toBe( "Foo" );
} );

test( "NewChart allows for submitting a label", () => {
	const newChart = shallow( <NewChart createChart={ () => null } /> );

	expect( newChart.state().labels ).toEqual( [] );

	newChart.setState( { newLabel: "Foo" } );

	newChart
		.find( "form" )
		.simulate( "submit", { preventDefault() {} } );

	expect( newChart.state().labels ).toEqual( [ "Foo" ] );
} );

test( "NewChart.addLabel calls event.preventDefault", () => {
	const preventDefaultSpy = sinon.spy();

	const newChart = shallow( <NewChart createChart={ () => null } /> );

	newChart
		.find( "form" )
		.simulate( "submit", { preventDefault: preventDefaultSpy } );

	sinon.assert.calledOnce( preventDefaultSpy );
} );

test( "NewChart does not allow submitting a chart if labels.length < 3", () => {
	const createChartSpy = sinon.spy();

	const newChart = shallow( <NewChart createChart={ createChartSpy } /> );

	newChart.setState( { labels: [ 1, 2 ], name: "Foo" } );

	newChart
		.find( ".new-chart__submit" )
		.simulate( "click" );

	expect( createChartSpy.callCount ).toBe( 0 );
} );

test( "NewChart does not allow submitting a chart if no name has been entered", () => {
	const createChartSpy = sinon.spy();

	const newChart = shallow( <NewChart createChart={ createChartSpy } /> );

	newChart.setState( { labels: [ 1, 2, 3 ], name: "" } );

	newChart
		.find( ".new-chart__submit" )
		.simulate( "click" );

	expect( createChartSpy.callCount ).toBe( 0 );
} );

test( "NewChart calls props.createChart on submit if the data is valid", () => {
	const createChartSpy = sinon.spy();

	const newChart = shallow( <NewChart createChart={ createChartSpy } /> );

	newChart.setState( { labels: [ 1, 2, 3 ], name: "Foo" } );

	newChart
		.find( ".new-chart__submit" )
		.simulate( "click" );

	sinon.assert.calledOnce( createChartSpy );
	expect( createChartSpy.firstCall.args ).toEqual( [ [ 1, 2, 3 ], "Foo" ] );
} );

test( "NewChart resets to initial state after submit", () => {
	const createChartSpy = sinon.spy();

	const newChart = shallow( <NewChart createChart={ createChartSpy } /> );

	newChart.setState( { labels: [ 1, 2, 3 ], name: "Foo" } );

	newChart
		.find( ".new-chart__submit" )
		.simulate( "click" );

	expect( newChart.state() ).toEqual( {
		  labels: []
		, name: ""
		, newLabel: ""
	} );
} );
