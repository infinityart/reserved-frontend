import React from "react";
import ReservedLayout from "./ReservedLayout";
import StepSelector from "./form";

class Reserved extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showReserved: false,
        }
    }

    toggleReserved = () => this.setState({showReserved: !this.state.showReserved});

    render() {
        if (!this.state.showReserved) return <React.Fragment/>;

        return (
            <ReservedLayout showReserved={this.showReserved} toggleReserved={this.toggleReserved}>
                <StepSelector toggleReserved={this.toggleReserved} />
            </ReservedLayout>
        );
    }
}

export default Reserved;