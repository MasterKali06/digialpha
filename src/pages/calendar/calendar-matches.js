import "../../scss/pages/calendar/calendar-matches.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, connect } from "react"
import { getMatches } from "../../redux/actions/getMatches";
import DatePicker, { Calendar } from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { colors, gameColorList, gameLogoList, gameShadowList } from "../../constants/constants";
import { getMatchesModel } from "../../helper/matchesHelper";
import { motion } from "framer-motion";
import { RiExchangeFundsFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";

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

    const [start, setStart] = useState(epoch)
    const [end, setEnd] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMatches(gameId, "past", start, end))
        dispatch(getMatches(gameId, "upcoming", start, end))
    }, [start, end, dispatch, gameId])

    const onTimeChange = (epoch) => {
        console.log(epoch)
        if (epoch.start) {
            setStart(epoch.start)
            setEnd(epoch.end)
        } else {
            setStart(epoch)
        }
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


    var loading = past.loading && upcoming.loading
    var matches = past.matches.concat(upcoming.matches)
    console.log("result", matches)
    matches.sort((a, b) => b.beginAt - a.beginAt)


    const [selectedDay, setSelectedDay] = useState(props.today)
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null })
    const [rangePicker, setRangePicker] = useState(false)

    const formatSelectedDay = () => {
        var date = new Date(selectedDay["year"], selectedDay["month"] - 1, selectedDay["day"])
        props.onTimeChange(date.getTime())
        var newDate = date.toString().split(" ")
        return `${newDate[1]} ${newDate[2]} ${newDate[3]}`
    }

    const formatSelectedRange = () => {
        var start = selectedRange.from
        var end = selectedRange.to

        if (start && end) {
            var sDate = new Date(selectedRange.from.year, selectedRange.from.month - 1, selectedRange.from.day)
            var eDate = new Date(selectedRange.to.year, selectedRange.to.month - 1, selectedRange.to.day)

            props.onTimeChange({
                start: sDate.getTime(),
                end: eDate.getTime()
            })

            return `${start.day}/${start.month}/${start.year} - ${end.day}/${end.month}/${end.year}`
        } else {
            return "Pick a Range"
        }
    }

    const renderInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            placeholder={rangePicker ? "Pick a range" : "Pick a date"}
            value={rangePicker ? formatSelectedRange() : formatSelectedDay()}
            className="calendar-input" />
    )


    return (
        <div className="matches-container">


            <div className="date-picker-container">
                <RiExchangeFundsFill
                    onClick={() => setRangePicker(!rangePicker)}
                    className="calendar-change-btn"
                    style={{ color: gameColorList[props.gameId] }}
                />

                <DatePicker
                    colorPrimary={gameColorList[props.gameId]}
                    value={rangePicker ? selectedRange : selectedDay}
                    onChange={rangePicker ? setSelectedRange : setSelectedDay}
                    calendarTodayClassName="calendar-today"
                    renderInput={renderInput}
                    shouldHighlightWeekends
                />

            </div>

            <div className="matches-content-box">
                {
                    loading ?
                        <div className="spinner-div">
                            <ScaleLoader
                                loading={loading}
                                color={gameColorList[props.gameId]}
                                speedMultiplier={0.8}
                            />
                        </div>
                        : matches.map((match, index) => {

                            const curr = getMatchesModel(match)
                            const alterImg = gameLogoList[curr.gameId]
                            var date = new Date(parseInt(match.beginAt))
                            var time = `${date.getHours()}:${date.getMinutes()}`

                            if (match.status === "canceled") {
                                return <></>
                            }
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
                                    {
                                        match.status === "not_started" ?
                                            <div>CountDown</div>
                                            : <></>
                                    }

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