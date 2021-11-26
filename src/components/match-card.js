import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gameShadowList, gameLogoList } from "../constants/constants";
import { calculateTimeLeft, getMatchesModel } from "../helper/matchesHelper";
import "../scss/components/match-card.scss"
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { changeMatchId } from "../redux/actions/changeId";
import { formatTime } from "../helper/commonHelper";

const MatchCard = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const match = props.match
    const curr = getMatchesModel(match)
    const alterImg = gameLogoList[curr.gameId]
    var date = new Date(parseInt(match.begin_at))

    var time = formatTime(date)

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(match.begin_at));
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(match.begin_at));
        }, 1000);

        return () => clearTimeout(timer);
    })

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {

        timerComponents.push(
            <span>
                {timeLeft[interval] <= "9" ? `0${timeLeft[interval]}` : timeLeft[interval]}{interval !== "seconds" ? ":" : ""}
            </span>
        );
    });


    var upcomingMatch = match.status === "not_started"

    if (match.status === "canceled") {
        return <></>
    }

    const variants = {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }

    const openMatchPage = () => {
        dispatch(changeMatchId({ id: match.id, status: match.status }))
        history.push("./match")
    }

    return (
        <motion.div
            key={curr.id}
            className="matches-content-item"
            onClick={openMatchPage}
            variants={variants}
            initial="from"
            animate="to"
            duration="1s"
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
        >
            {
                upcomingMatch ?
                    <div className="count-down">{timerComponents.length ? timerComponents : <></>}</div>
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

                <div className="match-type">{`Best of ${match.number_of_games}`}</div>
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
                    {curr.result.length > 0 ? curr.result[0].score ? curr.result[0].score : 0 : 0}
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
                    {curr.result.length > 1 ? curr.result[1].score ? curr.result[1].score : 0 : 0}
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
}

export default MatchCard;