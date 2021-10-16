import { motion } from "framer-motion";
import { gameShadowList, gameLogoList } from "../constants/constants";
import { getMatchesModel } from "../helper/matchesHelper";


const MatchCard = (props) => {

    const match = props.match
    const curr = getMatchesModel(match)
    const alterImg = gameLogoList[curr.gameId]
    var date = new Date(parseInt(match.beginAt))
    var time = `${date.getHours()}:${date.getMinutes()}`

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
}

export default MatchCard;