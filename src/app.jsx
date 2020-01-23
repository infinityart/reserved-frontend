import React from "react";
import {hot} from "react-hot-loader";
import Initial from "./components/Initial";

class App extends React.Component {
    render = () => {
        return (<Initial/>);
    }
}

export default hot(module)(App);