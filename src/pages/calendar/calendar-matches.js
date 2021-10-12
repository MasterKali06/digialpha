import "../../scss/pages/calendar/calendar-matches.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, connect } from "react"
import { getMatches } from "../../redux/actions/getMatches";
import DatePicker from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { colors, gameColorList, gameShadowList } from "../../constants/constants";

const CalendarMatches = () => {

    // logic
    const gameId = useSelector(state => state.gameId)

    let date = new Date()
    const today = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }

    let epoch = date.getTime()
    let offset = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()
    epoch -= (offset * 1000)

    const [time, setTime] = useState(epoch)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMatches(gameId, "past", time))
    }, [time, dispatch, gameId])

    const onTimeChange = (epoch) => {
        setTime(epoch)
    }

    return (
        <CalendarMatchesUi
            onTimeChange={(newEpoch) => onTimeChange(newEpoch)}
            today={today}
            gameId={gameId}
        />
    )
}


const CalendarMatchesUi = (props) => {

    const past = useSelector(state => state.pastMatches)

    const [selectedDay, setSelectedDay] = useState(props.today)

    const formatSelectedDay = () => {
        var date = new Date(selectedDay["year"], selectedDay["month"] - 1, selectedDay["day"])
        props.onTimeChange(date.getTime())
        var newDate = date.toString().split(" ")
        return `${newDate[1]} ${newDate[2]} ${newDate[3]}`
    }

    const renderInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            placeholder="Pick a date"
            value={formatSelectedDay()}
            className="calendar-input" />
    )


    return (
        <div className="matches-container">
            <div className="date-picker-container">
                {/* TODO: change arrow */}
                <DatePicker
                    colorPrimary={gameColorList[props.gameId]}
                    value={selectedDay}
                    onChange={setSelectedDay}
                    calendarTodayClassName="calendar-today"
                    renderInput={renderInput}
                    shouldHighlightWeekends
                />
            </div>

        </div>
    )
}


export default CalendarMatches;