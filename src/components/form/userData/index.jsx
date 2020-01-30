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

    handleInput = (event) => {
        this.setState({[event.nativeEvent.target.name]: event.nativeEvent.target.value})
    };

    setPhoneNumber = phoneNumber => {
        this.setState({phoneNumber})
    };

    handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();
        this.setState({validated: true});

        if (form.checkValidity() === false) {
            return;
        }

        this.props.setData('firstName', this.state.firstName);
        this.props.setData('lastName', this.state.lastName);
        this.props.setData('email', this.state.email);
        this.props.setData('phoneNumber', this.state.phoneNumber);

        this.props.nextStep();
    };

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <h1 className={"text-center m-0 mt-2"}>Vul uw gegevens in</h1>
                    <Container className="userDataContainer">
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={6} xl={4}>
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
                                    <Form.Control type="email" name="email" value={this.state.email} required
                                                  placeholder="naam@voorbeeld.nl" onChange={this.handleInput}/>
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
                                        onChange={phoneNumber => this.setPhoneNumber(phoneNumber)}
                                        placeholder='+31123456789'
                                        inputProps={{
                                            name: 'phoneNumber',
                                            required: true,
                                            id: 'phoneNumber'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                    <div className="formStepControls">
                        <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                        <Button type="submit" variant="primary">Volgende</Button>
                    </div>
                </Form>
            </React.Fragment>
        );
    }
}

export default UserData;