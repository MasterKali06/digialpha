import "../scss/components/team-details.scss"

const TeamDetails = ({ stats }) => {


    // let stats;
    // if (team) {
    //     stats = team.stats
    // }

    // change the card style
    const TeamCard = ({ prefix, suffix }) => (
        <div className="team-details-card">
            <div className="tc-prefix-box">
                <div className="tc-prefix">
                    {prefix}
                </div>
            </div>
            <div className="tc-suffix-box">
                <div className="tc-suffix">
                    {suffix}
                </div>
            </div>

        </div>
    )

    return (
        <div className="team-details-body">
            {stats &&
                <>
                    <TeamCard prefix={"total matches"} suffix={stats.match_win + stats.match_lost} />
                    <TeamCard prefix={"total games"} suffix={stats.game_win + stats.game_lost} />
                    <TeamCard prefix={"win rate"} suffix={((stats.match_win / (stats.match_win + stats.match_lost)) * 100).toFixed(0)} />
                    <TeamCard prefix={"matches won"} suffix={stats.match_win} />
                    <TeamCard prefix={"matches lost"} suffix={stats.match_lost} />
                    {/* <TeamCard prefix={"played time"} suffix={(stats.length / 60).toFixed(2)} /> */}
                    { /* recent glories */}
                </>
            }
        </div>
    )
}


export default TeamDetails;