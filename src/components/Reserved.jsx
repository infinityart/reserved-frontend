import React from "react";
import ReservedLayout from "./ReservedLayout";
import StepSelector from "./form/StepSelector";

class Reserved extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showReserved: false,
            step: 0
        }
    }

    toggleReserved = () => this.setState({showReserved: !this.state.showReserved});

    render() {
        if (!this.state.showReserved) return <React.Fragment/>;

        return (
            <ReservedLayout showReserved={this.showReserved} toggleReserved={this.toggleReserved}>
                <StepSelector currentStep={this.state.step} />
            </ReservedLayout>
        );
    }
}

export default Reserved;