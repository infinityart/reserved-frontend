import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert'

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treatments: [],
            showAlert: false
        }
    }

    componentDidMount() {
        this.getTreatmentList();
    }

    getTreatmentList() {
        fetch(`${APIEndpoint}/treatments`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.data.forEach(treatment => treatment.selected = false);

                this.setState({treatments: data.data});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleSelectedTreatment(selectedTreatment) {
        selectedTreatment.selected = !selectedTreatment.selected;

        let treatments = this.state.treatments.map(treatment =>
            treatment.id === selectedTreatment.id
                ? selectedTreatment
                : treatment
        );

        let selectedTreatments = treatments.filter(treatment => treatment.selected);

        this.setState({treatments, showAlert: false});
        this.props.setData('selectedTreatments', selectedTreatments);
    }

    nextStep = () => {
        let nextStep = this.state.treatments.some(treatment => treatment.selected);

        if (nextStep) {
            this.props.nextStep();
        } else {
            this.setState({showAlert: true})
        }
    };

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                {this.state.showAlert ?
                    <Alert variant="danger" onClose={() => this.setState({showAlert: false})} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>Er moet een behandeling gekozen zijn.</p>
                    </Alert>
                    : null}
                <h1 className={"text-center m-0 mt-2"}>Kies de behandelingen</h1>
                <div className="selectTreatmentsContainer">
                    <div className="selectTreatments">
                        {this.state.treatments.map((treatment, idx) => {
                            if (treatment.selected) return;

                            return <p onClick={() => {
                                this.handleSelectedTreatment(treatment)
                            }} key={idx}>{`${treatment.name} (${treatment.duration})`}</p>
                        })}
                    </div>
                </div>
                <h2 className={"text-center m-0"}>Gekozen behandelingen</h2>
                <div className="selectedTreatments">
                    {this.state.treatments.map((treatment, idx) => {
                        if (!treatment.selected) return;

                        return (
                            <div onClick={() => {
                                this.handleSelectedTreatment(treatment)
                            }} className="selectedTreatment" key={idx}>
                                {`${treatment.name} (${treatment.duration})`}
                            </div>
                        );
                    })}
                </div>
                <div className="formStepControls">
                    <Button onClick={this.nextStep} variant="primary">Volgende</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;