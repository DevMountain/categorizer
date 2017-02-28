# Categorizer
<img src="https://raw.githubusercontent.com/DevMountain/categorizer/master/readme_assets/completed.png" />

### Project Summary

During this project we'll be building a web application that allows for easily categorizing information in radar charts. Users will be able to keep track of multiple categories, each category having multiple data sets. To keep track of this data and pass it to the correct components we'll make heavy use of Redux and React Redux.


### Setup

Get started with the usual steps: 

* Fork and clone this repository
* `cd` into the project directory
* `npm i` to download the included dependencies
* `npm test` to start the test suite
* `npm start` to spin up the development server

### Step 1

**Summary**

The first step will be focused on the initial setup required to make a Redux application. We will install the required dependencies, create a reducer and Redux store, and connect the application to Redux.

**Instructions**

* Install Redux and React Redux
* Create `src/ducks/chart.js`
* Write an initial state and reducer inside of `src/ducks/chart.js`
* Create `src/store.js`
* Create the Redux store in `src/store.js`
* Connect the application to Redux in `src/index.js`

**Detailed Instructions**

Start by installing the following dependencies

* [`redux`](http://redux.js.org/) - A state container for JavaScript applications. This library allows us to easily store and access information  from across an entire application.
* [`react-redux`](https://github.com/reactjs/react-redux) - The official bindings to seamlessly connect a React application to Redux.

As those install, create a new directory inside of `src` named `ducks`. This is the directory where our reducer will live. Inside of `src/ducks` create a file `chart.js`. `chart.js` will hold a reducer, action types, action creators, and the reducer's initial state.

Open up `src/ducks/chart.js` and start by creating an `initialState` variable. `initialState` should be an object with two properties:

* `activeChartIndex` - This is where we will store the index of the chart that the user has chosen to display. It should default to `0`
* `charts` - This will be an array of objects containing the data necessary to create the charts. We'll have it default to an array containing an example chart object that looks like this:

```javascript
{
  // Labels corresponding to the corners of the chart.
  labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
  // The name of the chart
, name: "Example Chart"
  // The data required for rendering values to the chart
, datasets: [
		{
			  // The name of the dataset
			  label: "My First dataset"
			  // Each of these numbers corresponds to one of the labels above,
			  // based on index
			, data: [65, 59, 90, 81, 56, 55, 40]
		}
		, {
			  label: "My Second dataset"
			, data: [28, 48, 40, 19, 96, 27, 100]
		}
	]
}
```

Once the `initialState` is created we can create our reducer. Create and export by default a function named `chart` which takes two parameters

* `state` - This will be an object representation of our application's current state. It should default to `initialState`.
* `action` - An object containing information about what has occurred, and any data necessary to perform a state change.

Add a `switch` statement to the `chart` function that checks `action.type`. Later it will check for specific types, but for now just give it a `default` case that returns `state`.

Now that the bones of the reducer are in place, we can create the application's Redux store. Create a new file in `src` named `store.js`. Inside of `src/store.js` import `createStore` from Redux and `chart` from `src/chart.js`. Create the Redux store by invoking `createStore` and passing in `chart`, export the store by default.

What is Redux doing behind the scenes here? When Redux first initializes it will call the `chart` reducer function passing `undefined` as the first argument and a dummy action as the second argument. Our function will return the default state value of `initialState`, giving Redux an initial value to work with.

Finally, it is time to connect the React application to Redux. In `src/index.js` import `Provider` from React Redux and `store` from `src/store.js`. Wrap the `App` component in the `Provider` component, passing `store` as a prop to `Provider`.  `Provider` is simply a wrapper component that gives the rest of the application access to the `store`.

That's it for step 1! Nothing appears to have changed, but we've laid the groundwork we'll build on over the next steps!

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/ducks/chart.js`</summary>

```javascript
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
		default: return state;
	}
}

```

</details>

<details>

<summary>`src/store.js`</summary>

```javascript
import { createStore } from "redux";

import chart from "./ducks/chart";

export default createStore( chart );
```

</details>

<details>

<summary>`src/index.js`</summary>

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store";

import App from "./components/App";

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById( 'root' )
);

```

</details>

</details>

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
