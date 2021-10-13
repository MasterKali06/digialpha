import "../../scss/pages/calendar/calendar-matches.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, connect } from "react"
import { getMatches } from "../../redux/actions/getMatches";
import DatePicker from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { colors, gameColorList, gameLogoList, gameShadowList } from "../../constants/constants";
import { getMatchesModel } from "../../helper/matchesHelper";
import { motion } from "framer-motion";

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
        dispatch(getMatches(gameId, "upcoming", time))
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
    const upcoming = useSelector(state => state.upcomingMatches)

    const variants = {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }

    past.matches.sort((a, b) => b.beginAt - a.beginAt)
    upcoming.matches.sort((a, b) => b.beginAt - a.beginAt)


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

            <div className="matches-content-box">
                {
                    past.matches.map((match, index) => {

                        const curr = getMatchesModel(match)
                        const alterImg = gameLogoList[curr.gameId]
                        var date = new Date(parseInt(match.beginAt))
                        var time = `${date.getHours()}:${date.getMinutes()}`

                        return (
                            <motion.div
                                key={curr.id}
                                className="matches-content-item"
                                variants={variants}
                                initial="from"
                                animate="to"
                                duration="1s"
                                whileTap={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                            >

                                {/* tournament */}
                                <div className="tournament-row"
                                    style={{ borderBottom: `0.5px solid ${gameShadowList[curr.gameId]}` }}>

                                    <div className="match-tournament-detail">
                                        <img
                                            className="small-logo"
                                            src={curr.tourImg ? curr.tourImg : alterImg}
                                            alt={curr.id}
                                        />

                                        <div className="match-tournament-title">{curr.tournament}</div>
                                    </div>

                                    <div className="match-type">{`Best of ${match.numberOfGames}`}</div>
                                </div>

                                { /* team1 */}
                                <div className="team-row">
                                    <div className="team-detail">
                                        <img
                                            className="small-logo"
                                            src={curr.img1 ? curr.img1 : alterImg}
                                            alt={curr.id}
                                        />
                                        <div className="match-title">{curr.team1}</div>
                                    </div>

                                    <div className="match-title">
                                        {curr.result.substring(0, 1)}
                                    </div>
                                </div>

                                { /* team2 */}
                                <div className="team-row">
                                    <div className="team-detail">
                                        <img
                                            className="small-logo"
                                            src={curr.img2 ? curr.img2 : alterImg}
                                            alt={curr.id}
                                        />
                                        <div className="match-title">{curr.team2}</div>
                                    </div>

                                    <div className="match-title">
                                        {curr.result.substring(2)}
                                    </div>
                                </div>

                                { /* tag and time */}
                                <div className="team-row">
                                    <div className="match-tag">
                                        {match.name}
                                    </div>
                                    <div className="match-tag">
                                        {time}
                                    </div>
                                </div>

                            </motion.div>
                        )

                    })
                }

            </div>

        </div>
    )
}


export default CalendarMatches;