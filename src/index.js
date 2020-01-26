import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.scss";

import App from "./app.jsx";

window.APIEndpoint = 'http://reserved-backend.test';

ReactDOM.render(<App />, document.getElementById("root"));