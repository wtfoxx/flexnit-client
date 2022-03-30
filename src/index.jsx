import React from "react";
import Container from "react-bootstrap/Container";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";

import MainView from "./components/main-view/main-view";

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all the others)
class flexnitApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        
          <MainView  />
     
      </Provider>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells react to render you app in the root DOM element
ReactDOM.render(React.createElement(flexnitApplication), container);