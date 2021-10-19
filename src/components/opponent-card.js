import "../scss/components/opponent-card.scss"

const OpponentCard = (props) => {

    var team = props.team.detail
    var match = props.match
    var teamNum = props.team.num

    let teamImg;
    var imgAvailable = false;
    if (team) {
        imgAvailable = team.image.length > 0;
        if (imgAvailable) {
            teamImg = `data:image/png;base64,${team.image}`
        }
    } else {
        return <></>
    }

    return (
        <div className="opp-card">
            <img className="opp-logo" alt={team.id} src={imgAvailable ? teamImg : ""} />

            <div className="opp-name">{team.name}</div>

            <div className="opp-result">{teamNum ? match.result.substring(2) : match.result.substring(0, 1)}</div>
        </div>
    )
}

export default OpponentCard;