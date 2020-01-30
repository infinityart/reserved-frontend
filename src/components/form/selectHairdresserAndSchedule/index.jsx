import React from "react";
import './styles.scss';
import Button from "react-bootstrap/Button";
import Calendar from "./calendar";
import {AppointmentContext} from "./appointmentContext";
import Alert from "react-bootstrap/Alert";

// @todo controlleer gekozen tijdslot samen met treatsments duratie

class AppointmentSelector extends React.Component {

    constructor(props) {
        super(props);

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.state = {
            hairdressers: [],
            hairdresserAppointments: [],
            selectedDate: tomorrow,
            selectedHairdresser: null,
            selectedTime: null,
            timetable: null,
            setSelectHairdresser: this.setSelectHairdresser,
            setSelectedDate: this.setSelectedDate,
            setSelectedTime: this.setSelectedTime,
            setTimetable: this.setTimetable,
            resetData: this.resetData,
            errors: []
        };
    }

    componentDidMount() {
        this.getHairdressers();
        this.getHairdressersAppointmentsByDate();
    }

    setTimetable = timetable => {
        this.setState({timetable})
    };

    isHairdresserAvailable = () => {
        if (this.state.selectedTime === null) return;

        let hairdressers = this.state.hairdressers.map(hairdresser => {
            let hairdresserForAppointment = this.state.hairdresserAppointments.find(hairdressersAppointments => hairdressersAppointments.id === hairdresser.id);

            if (hairdresserForAppointment === undefined) return hairdresser;

            hairdresserForAppointment.appointments.forEach(appointment => {
                let startTime = new Date(appointment.startTime);
                let endTime = new Date(appointment.startTime);
                let currentTime = new Date(appointment.startTime);
                let endTimeTimeParts = appointment.endTime.split(/:/g);
                let currentTimeTimeParts = this.state.selectedTime.timeSlot.split(/:/g);

                endTime.setHours(endTimeTimeParts[0]);
                endTime.setMinutes(endTimeTimeParts[1]);

                currentTime.setHours(currentTimeTimeParts[0]);
                currentTime.setMinutes(currentTimeTimeParts[1]);

                hairdresser.available = !(currentTime >= startTime && currentTime <= endTime);
            });

            return hairdresser;
        });

        this.setState({hairdressers});
    };

    isTimeAvailable = () => {
        if (this.state.selectedHairdresser === null) return;

        let hairdresserForAppointment = this.state.hairdresserAppointments.find(hairdressersAppointments => hairdressersAppointments.id === this.state.selectedHairdresser.id);

        if (hairdresserForAppointment === undefined) return;

        hairdresserForAppointment.appointments.forEach(appointment => {
            let appointmentStart = new Date(appointment.startTime);
            let appointmentStartHour = String(appointmentStart.getHours()).padStart(2, '0');
            let appointmentStartMinute = String(appointmentStart.getMinutes()).padStart(2, '0');
            let appointmentStartTimeSlot = `${appointmentStartHour}:${appointmentStartMinute}`;
            let appointmentEndTimeSlot = appointment.endTime;

            let startTimeSlotIdx = this.state.timetable.findIndex(timeSlot => timeSlot.timeSlot === appointmentStartTimeSlot);
            let endTimeSlotIdx = this.state.timetable.findIndex(timeSlot => timeSlot.timeSlot === appointmentEndTimeSlot);

            for (let idx = startTimeSlotIdx; idx <= endTimeSlotIdx; idx++) {
                this.state.timetable[idx].available = false;
            }
        });

        this.setState({timetable: this.state.timetable});
    };

    getHairdressers() {
        fetch(`${APIEndpoint}/hairdressers`)
            .then((response) => response.json())
            .then((data) => {
                data.data.forEach(hairdresser => hairdresser.available = true);

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
                if (response.ok) return response.json();

                throw Error(response.statusText);
            })
            .then((data) => {
                this.setState({hairdresserAppointments: data.data}, () => {
                    this.isTimeAvailable();
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    setSelectHairdresser = selectedHairdresser => {
        this.setState({selectedHairdresser, errors: []}, () => {
            this.resetTimetable();
            this.isTimeAvailable();
        });
    };

    setSelectedDate = (selectedDate) => {
        this.resetTimetable();
        this.setState({selectedDate});
        this.getHairdressersAppointmentsByDate();
    };

    setSelectedTime = selectedTime => {
        this.setState({selectedTime, errors: []}, () => {
            this.isHairdresserAvailable();
        });
    };

    resetData = () => {
        this.state.hairdressers.forEach(hairdresser => hairdresser.available = true);


        this.setState({selectedTime: null, hairdressers: this.state.hairdressers,});
    };

    resetTimetable = () => {
        this.state.timetable.forEach(timeSlot => timeSlot.available = true);

        this.setState({timetable: this.state.timetable});
    };

    nextStep = () => {
        let errors = [];

        if (this.state.selectedTime === null) errors.push('Er moet een tijd gekozen zijn.');
        if (this.state.selectedHairdresser === null) errors.push('Er moet een kapper gekozen zijn.');

        if (errors.length) {
            this.setState({errors});
            return;
        }

        if (!this.state.selectedHairdresser.available) {
            errors.push('Kies een beschikbare kapper of tijd.');

            this.setState({errors});
            return;
        }

        let selectedDate = this.state.selectedDate;
        let timeSlotParts = this.state.selectedTime.timeSlot.split(/:/g);

        selectedDate.setHours(timeSlotParts[0]);
        selectedDate.setMinutes(timeSlotParts[1]);
        selectedDate.setSeconds(0);

        let dd = String(selectedDate.getDate()).padStart(2, '0'),
            mm = String(selectedDate.getMonth() + 1).padStart(2, '0'), //January is 0!
            yyyy = selectedDate.getFullYear(),
            hours = String(selectedDate.getHours()).padStart(2, '0'),
            minutes = String(selectedDate.getMinutes()).padStart(2, '0');

        let selectedDateAsString = `${dd}-${mm}-${yyyy} ${hours}:${minutes}`;

        this.props.setData('selectedHairdresser', this.state.selectedHairdresser);
        this.props.setData('selectedScheduledAt', selectedDateAsString);

        this.props.nextStep();
    };

    render() {
        if (!this.props.display) return <React.Fragment/>;

        return (
            <React.Fragment>
                {this.state.errors.length ?
                    <Alert variant="danger" onClose={() => this.setState({errors: []})} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        {this.state.errors.map((error, idx) => <p key={idx}>{error}</p>)}
                    </Alert>
                    : null}
                <h1 className={"text-center m-0 mt-2"}>Kies de kapper en een tijd</h1>
                <div className="appointment">
                    <div className="hairdressers">
                        {this.state.hairdressers.map((hairdresser, idx) => {
                            let selected = this.state.selectedHairdresser == hairdresser;
                            let selectedClass = selected ? 'selected' : '';
                            let unavailable = hairdresser.available ? '' : 'unavailable';

                            return (
                                <div className={`hairdresser ${selectedClass} ${unavailable}`} key={idx}
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
                    <AppointmentContext.Provider value={this.state}>
                        <Calendar/>
                    </AppointmentContext.Provider>
                </div>
                <div className="formStepControls">
                    <Button onClick={this.props.previousStep} variant="outline-primary">Vorige</Button>
                    <Button onClick={this.nextStep} variant="primary">Volgende</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default AppointmentSelector;