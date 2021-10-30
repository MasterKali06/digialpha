import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { gameColorList } from "../constants/constants"
import "../scss/components/head-to-head.scss"

const HeadToHead = ({ data, teamOne, teamTwo }) => {

    const gameId = useSelector(state => state.gameId)
    const formatDate = (item) => {
        const dateObj = new Date(parseInt(item.date))
        return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDay()}`
    }

    const formatImg = (item) => {
        if (item.img) {
            return `data:image/png;base64,${item.img}`
        } else {
            return null
        }
    }

    const HthCard = () => (
        <table className="table-container">
            <thead>
                <tr>

                    <th>Series</th>
                    <th>Date</th>
                    <th>Result</th>
                </tr>
            </thead>

            {
                data.map(item => {

                    const img = item.serie ? formatImg(item.serie) : null

                    return (
                        <tr>
                            <td className="table-tour">
                                <img width="42px" height="42px" src={img ? img : ""} alt=" " />
                                {item.serie ? item.serie.name : ""}
                            </td>
                            <td>{formatDate(item)}</td>
                            <td>
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
                : <ClipLoader speedMultiplier={0.6} color={gameColorList[gameId]} width="64px" height="64px" />

            }
        </div>
    )
}

export default HeadToHead;