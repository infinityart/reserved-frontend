import React from "react";
import Form from "react-bootstrap/Form";

class SelectTreatments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treatments: [],
            selectedTreatments: []
        }
    }

    componentDidMount() {
        this.getTreatmentList();
    }

    getTreatmentList() {
        fetch('http://reserved-backend.test/treatments')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({treatments: data.data});
                this.setState({selectedTreatments: [1]});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        return (
            <React.Fragment>
                <Form>
                    <h1>Kies de behandelingen</h1>
                    <div className="selectedTreatments">
                        {this.state.selectedTreatments.map((treatmentID, idx) => {
                            let {name, duration} = this.state.treatments.find(treatment => treatment.id === treatmentID);

                            return (
                                <div className="selectedTreatment" key={idx}>
                                    {`${name} (${duration})`}
                                </div>
                            );
                        })}
                    </div>
                    {this.state.treatments.map((treatment, idx) => {
                        return (
                            <Form.Check
                                key={idx}
                                type={'checkbox'}
                                id={`default-checkbox-${idx}`}
                                label={`${treatment.name} (gem.tijdsduur: ${treatment.duration})`}
                            />
                        )
                    })}
                </Form>
            </React.Fragment>
        );
    }
}

export default SelectTreatments;