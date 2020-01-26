import React from "react";
import SelectTreatments from "./selectTreatments";
import Button from "react-bootstrap/Button";
import './styles.scss';

const INITIAL_STEP = 0;

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
        this.setState({step: this.state.step + 1})
    };

    previousStep = () => {
        this.setState({step: this.state.step - 1})
    };

    setData = (dataType, data) => {
        let appointmentData = this.state.appointmentData;

        appointmentData[dataType] = data;

        this.setState({appointmentData});
    };

    render() {
        let formStep;

        switch (this.state.step) {
            case INITIAL_STEP:
                formStep = <SelectTreatments setData={this.setData}/>;
                break;
            default:
                formStep = null;
                break;
        }

        return (
            <React.Fragment>
                {formStep}
                <div className="formStepControls">
                    {this.state.step != 0 ?
                        <Button onClick={this.previousStep} variant="outline-primary">Vorige</Button>
                        : null}

                    <Button onClick={this.nextStep} variant="primary">Volgende</Button>
                </div>
            </React.Fragment>
        )

    }

}

export default StepSelector;