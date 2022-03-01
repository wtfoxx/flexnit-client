import React from "react";
import reactDom from "react-dom";

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//Main component (will eventually use all the others)
class flexnitApplication extends React.Component {
  render() {
    return (
      <div className="flexnit">
        <div>Good morning</div>
      </div>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells react to render you app in the root DOM element
ReactDOM.render(React.createElement(flexnitApplication), container);