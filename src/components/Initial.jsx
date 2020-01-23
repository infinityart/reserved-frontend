import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

class Initial extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <Navbar bg={"light"} className="boxShadow-default" expand="lg">
                    <Navbar.Brand href="#home">Reserved-prototype</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                    <h1 className={"text-center mt-5"}>Reserved</h1>
                    <Jumbotron className="mt-5 boxShadow-default">
                        <h1>Hello!</h1>
                        <p>
                            This is a prototype for testing the Reserved Appointment Module. Click on the button to test out the functionality!
                        </p>
                        <p>
                            <Button onClick={this.openReserved} variant="primary">Make an appointment</Button>
                        </p>
                    </Jumbotron>
                </Container>
            </React.Fragment>
        )
    }
}

export default Initial;