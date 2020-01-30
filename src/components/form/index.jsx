import React from "react";
import './styles.scss';
import SelectTreatments from "./selectTreatments";
import AppointmentSelector from "./selectHairdresserAndSchedule";
import UserData from "./userData";
import {AppointmentDataContext} from "./appointmentDataContext";
import AppointmentOverview from "./appointmentOverview";

const INITIAL_STEP = 0;
const SECOND_STEP = 1;
const THIRD_STEP = 2;
const FINAL_STEP = 3;

class StepSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
                <AppointmentDataContext.Provider value={this.state.appointmentData}>
                    <AppointmentOverview display={this.state.step === FINAL_STEP} previousStep={this.previousStep} toggleReserved={this.props.toggleReserved}/>
                </AppointmentDataContext.Provider>
            </React.Fragment>
        )
    }
}

export default StepSelector;