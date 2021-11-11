import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { gameColorList } from "../constants/constants"
import { formatImage } from "../helper/commonHelper"
import { formatDate } from "../helper/tournametsHelper"
import "../scss/components/head-to-head.scss"

const HeadToHead = ({ data, teamOne, teamTwo }) => {

    const gameId = useSelector(state => state.gameId)

    const HthCard = () => (
        <table className="table-container">
            <thead>
                <tr>

                    <th className="th-1">Series</th>
                    <th className="th-2">Date</th>
                    <th className="th-3">Result</th>
                </tr>
            </thead>

            {
                data.map(item => {

                    const img = item.serie ? formatImage(item.serie.img) : null

                    return (
                        <tr>
                            <td className="table-tour td-1">
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
        </table>
    )

    return (
        <div className="hth-body">
            {data ?

                <HthCard />
                :
                <div className="hth-loader">
                    <ClipLoader speedMultiplier={0.6} color={gameColorList[gameId]} width="64px" height="64px" />
                </div>
            }
        </div>
    )
}

export default HeadToHead;