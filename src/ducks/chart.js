const ADD_DATASET = "ADD_DATASET";
const CREATE_CHART = "CREATE_CHART";
const SET_ACTIVE_CHART = "SET_ACTIVE_CHART";

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

export default function chart( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_DATASET:
			return {
				  activeChartIndex: state.activeChartIndex
				, charts: state.charts.map( ( chart, index ) => {
					if ( index === state.activeChartIndex ) {
						return Object.assign( {}, chart, { datasets: [ ...chart.datasets, action.dataset ] } );
					}
					return chart;
				} )
			};
		case CREATE_CHART:
			return {
				  activeChartIndex: 0
				, charts: [ Object.assign( {}, action.chart, { datasets: [] } ), ...state.charts ]
			};
		case SET_ACTIVE_CHART:
			return {
				  activeChartIndex: action.activeChartIndex
				, charts: state.charts
			};
		default:
			return state;
	}
}

export function addDataset( dataset ) {
	return { dataset, type: ADD_DATASET };
}

export function createChart( labels, name ) {
	return { chart: { labels, name }, type: CREATE_CHART }
}

export function setActiveChartIndex( activeChartIndex ) {
	return { activeChartIndex, type: SET_ACTIVE_CHART };
}
