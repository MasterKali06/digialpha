import { useSelector } from "react-redux"
import { gameLogoList } from "../constants/constants"
import "../scss/components/opponent-card.scss"

const OpponentCard = (props) => {

    var team = props.team.detail
    var match = props.match
    var teamNum = props.team.num

    const gameId = useSelector(state => state.gameId)
    const alterImg = gameLogoList[gameId]

    let teamImg;
    var imgAvailable = false;
    if (team) {
        imgAvailable = team.image;
        if (imgAvailable) {
            teamImg = `data:image/png;base64,${team.image}`
        }
    } else {
        console.log(match.id)
        return <></>
    }

    return (
        <div className="opp-card">
            <img className="opp-logo" alt=" " src={imgAvailable ? teamImg : alterImg} />

            <div className="opp-name">{team.name}</div>

            <div className="opp-result">
                {match.results.length > 0 ?
                    match.results[teamNum].score :
                    0
                }
            </div>
        </div>
    )
}

export default OpponentCard;