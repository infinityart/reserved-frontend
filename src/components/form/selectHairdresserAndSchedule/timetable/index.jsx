import React from "react";
import "./styles.scss";

class TimeTable extends React.Component {
    constructor(props) {
        super(props);

        let startTime = new Date(0, 0, 0, 0, 0, 0);
        startTime.setHours(9);

        this.state = {
            startTime: startTime,
            endTime: 17
        }
    }

    renderTime() {
        let currentTime = this.state.startTime;
        let idx = 1;
        let times = [];

        while (currentTime.getHours() !== this.state.endTime) {
            let timeString = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
            let selected = this.props.selectedTime == timeString ? 'selected' : '';

            let time =
                <div className={"time " + selected} key={idx} onClick={() => this.props.setSelectedTime(timeString)}>
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
            <div className={"timetable"}>
                {this.renderTime()}
            </div>
        );
    }
}

export default TimeTable;