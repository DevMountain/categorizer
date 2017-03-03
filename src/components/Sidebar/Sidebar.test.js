import React from "react";
import { shallow } from "enzyme";

import Sidebar from "./Sidebar";

test( "Sidebar displays a list of past charts", () => {
	const sidebar = shallow(
		<Sidebar
			charts={ [ { name: "foo" }, { name: "bar" } ] }
			setActiveChartIndex={ () => null }
		/>
	);

	expect( sidebar.find( ".sidebar__past-chart" ).length ).toBe( 2 );
} );
