import "../../scss/pages/calendar/calendar-matches.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, connect } from "react"
import { getMatches } from "../../redux/actions/getMatches";
import { Calendar } from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { colors } from "../../constants/constants";

const CalendarMatches = () => {

    // logic
    const gameId = useSelector(state => state.gameId)

    let date = new Date()
    const today = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay()
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
        console.log("new time set")
        setTime(epoch)
    }

    return (
        <CalendarMatchesUi onTimeChange={(newEpoch) => onTimeChange(newEpoch)} epoch={today} />
    )
}


const CalendarMatchesUi = (props) => {

    const past = useSelector(state => state.pastMatches)

    const [selectedDay, setSelectedDay] = useState(props.today)

    return (
        <div className="matches-container">
            <div className="date-picker-container">
                <Calendar
                    colorPrimary={colors.auraGreen}
                    value={selectedDay}
                    onChange={setSelectedDay}
                    shouldHighlightWeekends
                />
            </div>


        </div>
    )
}


export default CalendarMatches;