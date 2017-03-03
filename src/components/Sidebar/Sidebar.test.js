import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";

import Sidebar from "./Sidebar";

const charts = [
	  { datasets: [ { label: "Test", data: [ 1, 2, 3 ] } ], name: "Foo" }
	, { datasets: [], name: "Bar" }
];

test( "Sidebar displays a list of past charts", () => {
	const sidebar = shallow(
		<Sidebar
			charts={ charts.slice() }
			setActiveChartIndex={ () => null }
		/>
	);

	expect( sidebar.find( ".sidebar__past-chart" ).length ).toBe( 2 );

	sidebar.setProps( { charts: charts.slice( 0, 1 ) } );

	expect( sidebar.find( ".sidebar__past-chart" ).length ).toBe( 1 );
} );

test( "sidebar displays chart names", () => {
	const sidebar = shallow(
		<Sidebar
			charts={ charts.slice() }
			setActiveChartIndex={ () => null }
		/>
	);

	expect( sidebar.find( ".sidebar__chart-name" ).first().text() ).toBe( "Foo" );
} );

test( "sidebar displays dataset counts", () => {
	const sidebar = shallow(
		<Sidebar
			charts={ charts.slice() }
			setActiveChartIndex={ () => null }
		/>
	);

	expect( sidebar.find( ".sidebar__chart-datasets" ).first().text() ).toBe( "1 Datasets" );
	expect( sidebar.find( ".sidebar__chart-datasets" ).last().text() ).toBe( "0 Datasets" );
} );

test( "sidebar calls props.setActiveChartIndex on chart click", () => {
	const setActiveChartIndexSpy = sinon.spy();

	const sidebar = shallow(
		<Sidebar
			charts={ charts.slice() }
			setActiveChartIndex={ setActiveChartIndexSpy }
		/>
	);

	expect( setActiveChartIndexSpy.called ).toBe( false );

	sidebar.find( ".sidebar__chart-name" ).first().simulate( "click" );

	sinon.assert.calledOnce( setActiveChartIndexSpy );
	expect( setActiveChartIndexSpy.firstCall.args[ 0 ] ).toBe( 0 );
} );
