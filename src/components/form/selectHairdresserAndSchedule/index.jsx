import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";
import Calendar from "./calendar";

class AppointmentSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hairdressers: [],
            hairdresserAppointments: [],
            selectedDate: new Date(),
            selectedHairdresser: null,
        };
    }

    componentDidMount() {
        this.getHairdressers();
        this.getHairdressersAppointmentsByDate();
    }

    getHairdressers() {
        fetch(`${APIEndpoint}/hairdressers`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({hairdressers: data.data});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    getHairdressersAppointmentsByDate() {
        let selectedDate = this.state.selectedDate;

        let dd = String(selectedDate.getDate()).padStart(2, '0');
        let mm = String(selectedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = selectedDate.getFullYear();

        selectedDate = `${dd}-${mm}-${yyyy}`;

        fetch(`${APIEndpoint}/hairdressers/appointments?date=${selectedDate}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({hairdresserAppointments: data.data});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    setSelectHairdresser = hairdresser => this.setState({selectedHairdresser: hairdresser});

    setSelectedDate = (selectedDate) => {
        this.setState({selectedDate});
        this.getHairdressersAppointmentsByDate();
    };

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                <h1 className={"text-center m-0 mt-2"}>Kies de kapper en een tijd</h1>
                <div className="appointment">
                    <div className="hairdressers">
                        {this.state.hairdressers.map((hairdresser, idx) => {
                            let selected = this.state.selectedHairdresser == hairdresser;
                            let selectedClass = selected ? 'selected' : '';

                            return (
                                <div className={"hairdresser " + selectedClass} key={idx}
                                     onClick={() => this.setSelectHairdresser(hairdresser)}>
                                    <div className="avatarContainer">
                                        <div className="avatar"></div>
                                    </div>
                                    <div className="name">
                                        {hairdresser.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Calendar selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate} />
                </div>
                <div className="formStepControls">
                    <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                    <Button onClick={this.props.nextStep} variant="primary">Volgende</Button>
                </div>
            </React.Fragment>

        );
    }
}

export default AppointmentSelector;