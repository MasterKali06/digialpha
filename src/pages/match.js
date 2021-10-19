import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../scss/pages/match/match.scss"
import OpponentCard from "../components/opponent-card";
import { requestMatch, requestTeam } from "../helper/request";

const Match = () => {

    var matchId = useSelector(state => state.matchId)
    var gameId = useSelector(state => state.gameId)

    let mode;
    switch (matchId.status) {
        case "not_started":
            mode = "upcoming"
            break;
        case "running":
            mode = "running"
            break;
        default:
            mode = "past"
    }

    const [match, setMatch] = useState(null)
    const [teamOne, setTeamOne] = useState(null)
    const [teamTwo, setTeamTwo] = useState(null)

    useEffect(() => {
        var matchData = requestMatch(gameId, mode, matchId.id)
        matchData
            .then(data => {
                if (data.length) {
                    setMatch(data[0])
                    var opp = data[0].opponents
                    if (opp[0]) {
                        var teamOne = requestTeam(gameId, opp[0].id)
                        teamOne.then(team => {
                            if (team.length) {
                                setTeamOne(team[0])
                            }
                        }).catch(err =>
                            console.log(err.message)
                        )
                    }

                    if (opp[1]) {
                        var teamTwo = requestTeam(gameId, opp[1].id)
                        teamTwo.then(team => {
                            if (team.length) {
                                setTeamTwo(team[0])
                            }
                        }).catch(err =>
                            console.log(err.message)
                        )
                    }
                }
            })
            .catch(err => console.log(err.message))

    }, [])

    console.log("match", match)
    console.log("teamOne", teamOne)
    console.log("teamTwo", teamTwo)

    var imgAvailable = false;
    let tourImg;
    if (match) {
        if (match.serie) {
            if (match.serie.image) {
                imgAvailable = true
                tourImg = `data:image/png;base64,${match.serie.image}`
            }
        }
    }

    return (
        <div className="match-container">

            <div className="match-tour">
                {/* logo and serie name goes here */}
                <img className="tour-logo" src={imgAvailable ? tourImg : ""} alt={match ? match.id : ""} />
                <div className="tour-name">{match ? match.serie ? match.serie.name : "" : ""}</div>
            </div>

            <div className="video-container">
                <div className="opponent-details1">
                    <OpponentCard team={{ num: 0, detail: teamOne }} match={match} />
                </div>

                <div className="video-content-box">
                    {
                        match ?
                            match.streams !== "None" ?
                                <iframe
                                    className="live-iframe"
                                    src={`${match.streams}&localhost`}
                                    frameborder="0"
                                    allowfullscreen="true"
                                    scrolling="no"
                                    height="100%"
                                    width="100%"
                                    title={match.id}>
                                </iframe>
                                :
                                // no live stream
                                <></>
                            : // loading
                            <></>
                    }
                </div>

                <div className="opponent-details2">
                    <OpponentCard team={{ num: 1, detail: teamTwo }} match={match} />
                </div>
            </div>

            <div className="detail-container">

            </div>

        </div>
    )
}

export default Match;