import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";

class AppointmentSelector extends React.Component {

    render() {
        if(!this.props.display) return <React.Fragment />;

        return (
            <div className="formStepControls">
                <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                <Button onClick={this.props.nextStep} variant="primary">Volgende</Button>
            </div>
        );
    }
}

export default AppointmentSelector;