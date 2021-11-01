import { gameColorList } from "../constants/constants"
import { formatImage } from "../helper/commonHelper"
import { formatDate } from "../helper/tournametsHelper"

const Table = ({ gameId, tourList, active }) => {
    return (
        <table className="tour-table">
            <thead>
                <tr>
                    <th className="th-1" style={{ color: gameColorList[gameId] }}>Serie</th>
                    <th className="th-2" style={{ color: gameColorList[gameId] }}>Season</th>
                    <th className="th-3" style={{ color: gameColorList[gameId] }}>Start</th>
                    <th className="th-4" style={{ color: gameColorList[gameId] }}>End</th>
                    <th className="th-5" style={{ color: gameColorList[gameId] }}>Winner</th>
                    <th className="th-6" style={{ color: gameColorList[gameId] }}>Prize</th>
                    <th className="th-7" style={{ color: gameColorList[gameId] }}>Site</th>
                </tr>
            </thead>
            <tbody>
                {
                    tourList.map(item => {
                        return (
                            <tr>
                                <td className="td-1">
                                    <div>
                                        <img src={item.image ? formatImage(item.image) : ""} alt=" " width="36px" height="36px" style={{ marginRight: "15px" }} />
                                        <div className="td-tour-name">{item.name}</div>
                                    </div>
                                </td>
                                <td className="td-2">{item.season ? item.season : ""}</td>
                                <td className="td-3">{formatDate(item.beginAt)}</td>
                                <td className="td-4">{formatDate(item.endAt)}</td>
                                <td className="td-5"></td>
                                <td className="td-6"></td>
                                <td className="td-7">{item.url !== "None" && <a href={item.url}>Visit Site</a>}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;