import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class UserData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        };
    }

    handleInput = (event) => { this.setState({ [event.nativeEvent.target.name]: event.nativeEvent.target.value }) }

    handleSubmit = (data) => {
        console.log(this.state.phoneNumber)
        console.log(data);

        this.setState({ validated: true });
    }

    render() {
        if (!this.props.display) return <React.Fragment />;

        return (
            <React.Fragment>
                <h1 className={"text-center m-0 mt-2"}>Vul uw gegevens in</h1>
                <Container className="userDataContainer">
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6} xl={4}>
                            <Form noValidate validated={this.state.validated}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>Voornaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Voornaam"
                                        name="firstName"
                                        onChange={this.handleInput}
                                        value={this.state.firstName}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Vul de voornaam in.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Achternaam</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Achternaam"
                                        name="lastName"
                                        onChange={this.handleInput}
                                        value={this.state.lastName}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Vul de achternaam in.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>E-mailadres</Form.Label>
                                    <Form.Control type="email" name="email" value={this.state.email} required placeholder="naam@voorbeeld.nl" onChange={this.handleInput} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Vul een correcte email in.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Telefoonnummer</Form.Label>
                                    <PhoneInput
                                        country='nl'
                                        value={this.state.phoneNumber}
                                        preferredCountries={['be', 'nl', 'de', 'fr']}
                                        onChange={this.handleInput}
                                        placeholder='+31123456789'
                                        inputProps={{
                                            name: 'phoneNumber',
                                            required: true,
                                            id: 'phoneNumber',
                                            onChange: this.handleInput
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <div className="formStepControls">
                    <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                    <Button onClick={this.handleSubmit} variant="primary">Volgende</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default UserData;