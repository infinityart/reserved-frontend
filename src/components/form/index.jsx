import React from "react";
import './styles.scss';
import SelectTreatments from "./selectTreatments";
import AppointmentSelector from "./selectHairdresserAndSchedule";
import UserData from "./userData";

const INITIAL_STEP = 0;
const SECOND_STEP = 1;
const THIRD_STEP = 2;

class StepSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showReserved: false,
            appointmentData: {},
            step: 0
        }
    }

    nextStep = () => {
        this.setState({ step: this.state.step + 1 })
    };

    previousStep = () => {
        this.setState({ step: this.state.step - 1 })
    };

    setData = (dataType, data) => {
        let appointmentData = this.state.appointmentData;

        appointmentData[dataType] = data;

        this.setState({ appointmentData }, () => {
            console.log(this.state.appointmentData)
        });
    };

    render() {
        const props = {
            nextStep: this.nextStep,
            previousStep: this.previousStep,
            setData: this.setData
        };

        return (
            <React.Fragment>
                <SelectTreatments display={this.state.step === INITIAL_STEP} {...props} />
                <AppointmentSelector display={this.state.step === SECOND_STEP} {...props} />
                <UserData display={this.state.step === THIRD_STEP} {...props} />
            </React.Fragment>
        )
    }
}

export default StepSelector;