import React from "react";
import SelectTreatments from "./SelectTreatments";

const INITIAL_STEP = 0;

class StepSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showReserved: false,
            step: 0
        }
    }

    render() {
        switch(this.props.currentStep) {
            case INITIAL_STEP: {
                return <SelectTreatments />
            }
        }
    }

}

export default StepSelector;