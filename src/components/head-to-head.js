import { useState } from "react"
import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { colors, gameColorList } from "../constants/constants"
import { formatImage } from "../helper/commonHelper"
import { formatDate } from "../helper/tournametsHelper"
import "../scss/components/head-to-head.scss"


const HeadToHead = ({ data, teamOne, teamTwo }) => {

    const gameId = useSelector(state => state.gameId)
    const hthData = data && data.matches

    const HthCard = () => (
        <table className="head-to-head">
            <thead>
                <tr>

                    <th className="th-1">Series</th>
                    <th className="th-2">Date</th>
                    <th className="th-3">Result</th>
                </tr>
            </thead>

            <tbody>
                {
                    hthData.length > 0 &&
                    hthData.map(item => {

                        const img = item.serie ? formatImage(item.serie.img) : null

                        return (
                            <tr>
                                <td className="td-1">
                                    <img width="36px" height="36px" className="hth-serie-logo" src={img ? img : ""} alt=" " />
                                    {item.serie ? item.serie.name : ""}
                                </td>
                                <td className="td-2">{formatDate(item.date)}</td>
                                <td className="td-3">
                                    {teamOne === item.t1 ? item.r1 : item.r2} : {teamTwo === item.t2 ? item.r2 : item.r1}
                                </td>

                            </tr>

                        )
                    })
                }
            </tbody>
        </table>
    )

    return (
        <div className="hth-body">
            {hthData ?

                <HthCard />
                :
                <div className="hth-loader">
                    <ClipLoader speedMultiplier={0.6} color={gameColorList[gameId]} width="64px" height="64px" />
                </div>
            }
        </div>
    )
}


export const HthBar = ({data, teamOne}) => {

    if (!data){
        return <></>
    }

    let team1;
    let team2;
    if (data.teamOneWinCount.id == teamOne){
        team1 = data.teamOneWinCount.count
        team2 = data.teamTwoWinCount.count
    }else{
        team1 = data.teamTwoWinCount.count
        team2 = data.teamOneWinCount.count
    }

    const total = team1 + team2

    const teamOnePercent = team1 !== 0 ? team1 / total * 100 : 0
    const teamTwoPercent = team2 !== 0 ? team2 / total * 100 : 0

    return (
        <div style={{
            width: "60%", margin: "-10px auto 25px auto", height: "15px", display: "flex",
            boxShadow: "2px 2px 2px var(--second-dark)"
        }}>
            {teamOnePercent && <HthBarChild percent={teamOnePercent} color="var(--frost-blue-dark)" />}
            {teamTwoPercent && <HthBarChild percent={teamTwoPercent} color="var(--aura-purple)" />}
            
        </div>
    )
}

const HthBarChild = ({percent, color}) => {
    return (
        <div
            style={{
                width: `${parseInt(percent)}%`, height: "18px", background:color,
                borderRadius:"5px", position: "relative", textAlign: "center", color: "var(--second-dark)", fontSize: "14px"
        }}>
            {parseInt(percent)}%
        </div>
    )
}

export default HeadToHead;