import React from "react";
import Form from "react-bootstrap/Form";
import {AppointmentDataContext} from "../appointmentDataContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class AppointmentOverview extends React.Component {
    static contextType = AppointmentDataContext;

    constructor(props) {
        super(props);
    }

    sendAppointment = () => {
        const treatmentIDs = this.context.selectedTreatments.map( treatment => treatment.id);
        const data = {
            firstName: this.context.firstName,
            lastName: this.context.lastName,
            email: this.context.email,
            phoneNumber: this.context.phoneNumber,
            scheduledAt: this.context.selectedScheduledAt,
            hairdresserID: this.context.selectedHairdresser.id,
            treatmentIDs
        };

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*');

        fetch(`${APIEndpoint}/appointment`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                <h1 className={"text-center m-0 mt-2"}>Controleer uw gegevens</h1>
                <Container className="userDataContainer">
                    <Row className="justify-content-center">
                        <Col xs={12} >
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Voornaam</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.firstName}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Achternaam</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.lastName}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>E-mailadres</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.email}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Telefoonnummer</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.phoneNumber}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Gepland op</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.selectedScheduledAt}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Gekozen kapper</Form.Label>
                                    <Col>
                                        <Form.Control plaintext readOnly defaultValue={this.context.selectedHairdresser.name}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column className={"font-weight-bold text-right"}>Gekozen behandeling(en)</Form.Label>
                                    <Col>
                                        {this.context.selectedTreatments.map( (treatment, idx) => {
                                            return <Form.Control key={idx} plaintext readOnly defaultValue={`${treatment.name} (${treatment.duration})`}/>
                                        })}
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <div className="formStepControls">
                    <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                    <Button onClick={this.sendAppointment} variant="primary">Verzend afspraak</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default AppointmentOverview;