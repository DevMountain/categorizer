import React from "react";
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

	expect( sidebar.find( ".sidebar__past-chart" ).first().text().includes( "Foo" ) ).toBe( true );
} );

test( "sidebar displays dataset counts", () => {
	const sidebar = shallow(
		<Sidebar
			charts={ charts.slice() }
			setActiveChartIndex={ () => null }
		/>
	);

	expect( sidebar.find( ".sidebar__past-chart" ).first().text().includes( 1 ) ).toBe( true );
	expect( sidebar.find( ".sidebar__past-chart" ).last().text().includes( 0 ) ).toBe( true );
} );

test( "sidebar calls props.setActiveChartIndex on chart click", () => {

} );
