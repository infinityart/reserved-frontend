import React from "react";
import Form from "react-bootstrap/Form";
import './styles.scss';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treatments: [],
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

        let selectedTreatments = treatments.filter( treatment => treatment.selected );

        this.setState({treatments});
        this.props.setData('selectedTreatments', selectedTreatments);
    }

    render() {
        return (
            <React.Fragment>
                <Form>
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
                </Form>
            </React.Fragment>
        );
    }
}

export default Index;