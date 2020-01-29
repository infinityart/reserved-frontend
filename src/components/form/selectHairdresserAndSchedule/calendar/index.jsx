import React from "react";
import "./styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { AppointmentContext} from "../appointmentContext";

class Calendar extends React.Component {
    static contextType = AppointmentContext;

    constructor(props) {
        super(props);

        let startTime = new Date(0, 0, 0, 0, 0, 0);
        startTime.setHours(9);

        this.state = {
            startTime: startTime,
            endTime: 17,
        }
    }

    changeDay = (direction) => {
        let day;
        let selectedDate = this.context.selectedDate;

        if (direction === 'up') {
            day = selectedDate.getDate() + 1;
        } else {
            day = selectedDate.getDate() - 1;
        }

        selectedDate.setDate(day);

        this.context.setSelectedDate(selectedDate);
        this.context.setSelectedTime(null);
    };

    changeMonth = (direction) => {
        let month;
        let selectedDate = this.context.selectedDate;

        if (direction === 'up') {
            month = selectedDate.getMonth() + 1;
        } else {
            month = selectedDate.getMonth() - 1;
        }

        selectedDate.setMonth(month);

        this.context.setSelectedDate(selectedDate);
        this.context.setSelectedTime(null);
    };

    renderTime() {
        let currentTime = this.state.startTime;
        let idx = 1;
        let times = [];

        while (currentTime.getHours() !== this.state.endTime) {
            let timeString = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
            let selected = this.context.selectedTime == timeString ? 'selected' : '';

            let time =
                <div className={"time " + selected} key={idx}
                     onClick={() => this.context.setSelectedTime( timeString)}>
                    {timeString}
                </div>
            ;

            times.push(time);
            currentTime.setMinutes(currentTime.getMinutes() + 15);
            idx++;
        }

        currentTime = currentTime.setHours(9);

        return times;
    }

    render() {
        return (
            <div className="calendar">
                <div className="dateSelection">
                    <div className="month">
                        <FontAwesomeIcon icon={faCaretLeft} onClick={() => {
                            this.changeMonth('down')
                        }}/>
                        Maand: {String(this.context.selectedDate.getMonth() + 1).padStart(2, '0')}
                        <FontAwesomeIcon icon={faCaretRight} onClick={() => {
                            this.changeMonth('up')
                        }}/>
                    </div>
                    <div className="day">
                        <FontAwesomeIcon icon={faCaretLeft} onClick={() => {
                            this.changeDay('down')
                        }}/>
                        Dag: {String(this.context.selectedDate.getDate()).padStart(2, '0')}
                        <FontAwesomeIcon icon={faCaretRight} onClick={() => {
                            this.changeDay('up')
                        }}/>
                    </div>
                </div>
                <div className={"timetable"}>
                    {this.renderTime()}
                </div>
            </div>
        );
    }
}

export default Calendar;