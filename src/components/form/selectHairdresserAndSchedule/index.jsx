import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'
import TimeTable from "./timetable";

class AppointmentSelector extends React.Component {

    constructor(props) {
        super(props);

        let today = new Date();

        this.state = {
            hairdressers: [],
            hairdresserAppointments: [],
            selectedDate: today,
            selectedHairdresser: null,
            selectedTime: null
        }
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
        let today = this.state.selectedDate;

        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = `${dd}-${mm}-${yyyy}`;

        fetch(`${APIEndpoint}/hairdressers/appointments?date=${today}`)
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

    changeDay = (direction) => {
        let day;
        let selectedDate = this.state.selectedDate;

        if (direction === 'up') {
            day = selectedDate.getDate() + 1;
        } else {
            day = selectedDate.getDate() - 1;
        }

        selectedDate.setDate(day);

        this.setState({selectedDate: selectedDate, selectedTime: null});
        this.getHairdressersAppointmentsByDate();
    };

    changeMonth = (direction) => {
        let month;
        let selectedDate = this.state.selectedDate;

        if (direction === 'up') {
            month = selectedDate.getMonth() + 1;
        } else {
            month = selectedDate.getMonth() - 1;
        }

        selectedDate.setMonth(month);

        this.setState({selectedDate: selectedDate, selectedTime: null});
        this.getHairdressersAppointmentsByDate();
    };

    setSelectHairdresser = hairdresser => this.setState({selectedHairdresser: hairdresser});
    setSelectedTime = time => this.setState({selectedTime: time});

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                <h1 className={"text-center m-0 mt-2"}>Kies de kapper en een tijd</h1>
                <div className="appointment">
                    <div className="hairdressers">
                        {this.state.hairdressers.map((hairdresser, idx) => {
                            let selected = this.state.selectedHairdresser == hairdresser;
                            let selectedClass  = selected ? 'selected' : '';

                            return (
                                <div className={"hairdresser " + selectedClass} key={idx} onClick={() => this.setSelectHairdresser(hairdresser)}>
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
                    <div className="calendar">
                        <div className="dateSelection">
                            <div className="month">
                                <FontAwesomeIcon icon={faCaretLeft} onClick={() => {
                                    this.changeMonth('down')
                                }}/>
                                Maand: {String(this.state.selectedDate.getMonth() + 1).padStart(2, '0')}
                                <FontAwesomeIcon icon={faCaretRight} onClick={() => {
                                    this.changeMonth('up')
                                }}/>
                            </div>
                            <div className="day">
                                <FontAwesomeIcon icon={faCaretLeft} onClick={() => {
                                    this.changeDay('down')
                                }}/>
                                Dag: {String(this.state.selectedDate.getDate()).padStart(2, '0')}
                                <FontAwesomeIcon icon={faCaretRight} onClick={() => {
                                    this.changeDay('up')
                                }}/>
                            </div>
                        </div>
                        <TimeTable setSelectedTime={this.setSelectedTime} selectedTime={this.state.selectedTime}/>
                    </div>
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