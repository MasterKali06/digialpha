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
import MatchCard from "../../components/match-card";

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
    })


    const onTimeChange = (epoch) => {
        if (epoch.start) {
            setStart(epoch.start)
            setEnd(epoch.end)
        } else {
            setStart(epoch)
            setEnd(null)
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
    var loading = past.loading || upcoming.loading


    var matches = past.matches.concat(upcoming.matches)

    matches.sort((a, b) => b.beginAt - a.beginAt)


    const [selectedDay, setSelectedDay] = useState(props.today)
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null })
    const [rangePicker, setRangePicker] = useState(false)


    let rangeMatches;
    if (matches.length > 0 && rangePicker) {
        var firstDate = new Date(parseInt(matches[0].beginAt))
        var firstDay = firstDate.getDate()
        rangeMatches = [{ day: firstDay, date: firstDate.toString().substring(0, 15), matches: [matches[0]] }]
        let y = 0
        for (let i = 1; i < matches.length; i++) {
            var curr = matches[i]
            var date = new Date(parseInt(curr.beginAt));
            var day = date.getDate()

            if (day !== rangeMatches[y].day) {
                y++
                rangeMatches.push(
                    {
                        day: day,
                        date: date.toString().substring(0, 15),
                        matches: [matches[i]]
                    }
                )
            } else {
                rangeMatches[y].matches.push(matches[i])
            }
        }

        console.log(rangeMatches)
    }


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


            {
                loading ?
                    <div className="spinner-div">
                        <ScaleLoader
                            loading={loading}
                            color={gameColorList[props.gameId]}
                            speedMultiplier={0.8}
                        />
                    </div>
                    :
                    <>
                        {
                            rangePicker ?
                                // range with sticky header goes here
                                <div className="range-matches-container">
                                    {rangeMatches ?
                                        rangeMatches.map(item => (
                                            <>
                                                <div className="date-header">{item.date}</div>
                                                <div className="range-matches-content">
                                                    {item.matches.map(match => (
                                                        <MatchCard match={match} />
                                                    ))}
                                                </div>
                                            </>
                                        ))
                                        :
                                        <></>
                                    }
                                </div>
                                :
                                <div className="matches-content-box">
                                    {matches.map(match => (
                                        <MatchCard match={match} />
                                    ))}
                                </div>
                        }
                    </>
            }
        </div>
    )
}


export default CalendarMatches;