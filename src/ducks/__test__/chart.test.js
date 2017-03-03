import chart, {
	  addDataset
	, createChart
	, setActiveChartIndex
} from "../chart";

const initialState = {
	  activeChartIndex: 0
	, charts: [ {
		  labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
		, name: "Example Chart"
		, datasets: [
			{
				  label: "My First dataset"
				, data: [65, 59, 90, 81, 56, 55, 40]
			}
			, {
				  label: "My Second dataset"
				, data: [28, 48, 40, 19, 96, 27, 100]
			}
		]
	} ]
};

test( "addDataset returns an object with type 'ADD_DATASET' and a dataset property", () => {
	expect( addDataset( [ 10, 20, 30 ] ) ).toEqual( { dataset: [ 10, 20, 30 ], type: "ADD_DATASET" } );
	expect( addDataset( [ 90, -20, 401 ] ) ).toEqual( { dataset: [ 90, -20, 401 ], type: "ADD_DATASET" } );
} );

test( "createChart returns an object with type 'CREATE_CHART' and a chart object", () => {
	expect( createChart( [ "Foo", "Bar", "Baz", "Qux" ], "Foochart" ) ).toEqual( {
		  chart: {
			  datasets: []
			, labels: [ "Foo", "Bar", "Baz", "Qux" ]
			, name: "Foochart"
		}
		, type: "CREATE_CHART"
	} );
	expect( createChart( [ "1", "2", "3", "4" ], "Barchart" ) ).toEqual( {
		  chart: {
			  datasets: []
			, labels: [ "1", "2", "3", "4" ]
			, name: "Barchart"
		}
		, type: "CREATE_CHART"
	} );
} );

test( "setActiveChartIndex returns an object with type 'SET_ACTIVE_CHART_INDEX' and an index", () => {
	expect( setActiveChartIndex( 10 ) ).toEqual( { index: 10, type: "SET_ACTIVE_CHART_INDEX" } );
	expect( setActiveChartIndex( 400 ) ).toEqual( { index: 400, type: "SET_ACTIVE_CHART_INDEX" } );
} );

test( "chart has initial state", () => {
	expect( chart( undefined, {} ) ).toEqual( initialState );
} );

test( "chart handles ADD_DATASET actions", () => {
	expect( chart( Object.assign( {}, initialState ), addDataset( { data: [ 20, 30, 50 ], label: "Fooset" } ) ) ).toEqual({
		  activeChartIndex: 0
		, charts: [ {
			labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
			, name: "Example Chart"
			, datasets: [
				  {
					  label: "My First dataset"
					, data: [65, 59, 90, 81, 56, 55, 40]
				}
				, {
					  label: "My Second dataset"
					, data: [28, 48, 40, 19, 96, 27, 100]
				}
				, {
					  label: "Fooset"
					, data: [ 20, 30, 50 ]
				}
			]
		} ]
	});
} );

test( "chart does not mutate state on ADD_DATASET actions", () => {
	const testState = Object.assign( {}, initialState );

	const nextState = chart( testState, addDataset( { data: [ 1 ], label: "Fooset" } ) );

	expect( testState ).toEqual( initialState );
	expect( testState ).not.toBe( nextState );
} );

test( "chart handles CREATE_CHART actions", () => {
	expect( chart( { activeChartIndex: 2, charts: [] }, createChart( [ "Foo", "Bar", "Baz" ], "Foochart" ) ) ).toEqual( {
		  activeChartIndex: 0
		, charts: [ {
			  labels: [ "Foo", "Bar", "Baz" ]
			, name: "Foochart"
			, datasets: []
		} ]
	} );
} );

test( "chart does not mutate state on CREATE_CHART actions", () => {
	const testState = Object.assign( {}, initialState );

	const nextState = chart( testState, createChart( [ "Foo", "Bar", "Baz" ], "Foochart" ) );

	expect( testState ).toEqual( initialState );
	expect( testState ).not.toBe( nextState );
} );

test( "chart handles SET_ACTIVE_CHART_INDEX actions", () => {
	expect( chart( Object.assign( {}, initialState ), setActiveChartIndex( 3 ) ).activeChartIndex ).toBe( 3 );
} );

test( "chart does not mutate state on SET_ACTIVE_CHART_INDEX actions", () => {
	const testState = Object.assign( {}, initialState );

	const nextState = chart( testState, setActiveChartIndex( 2 ) );

	expect( testState ).toEqual( initialState );
	expect( testState ).not.toBe( nextState );
} );
