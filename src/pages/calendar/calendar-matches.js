import "../../scss/pages/calendar/calendar-matches.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, connect } from "react"
import { getMatches } from "../../redux/actions/getMatches";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarMatches = () => {

    // logic
    const gameId = useSelector(state => state.gameId)

    let date = new Date()

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
        <CalendarMatchesUi onTimeChange={(newEpoch) => onTimeChange(newEpoch)} />
    )
}


const CalendarMatchesUi = (props) => {

    const past = useSelector(state => state.pastMatches)

    return (
        <div className="matches-container">

            <Calendar className="calendar" />

        </div>
    )
}


export default CalendarMatches;