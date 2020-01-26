import React from "react";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class ReservedLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleReserved = () => this.props.toggleReserved();

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.toggleReserved()}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                backdrop={'static'}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reserved - An appointment is just some clicks away
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className={"reservedBody"}>
                        {this.props.children}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => this.toggleReserved()}>Cancel appointment</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ReservedLayout;