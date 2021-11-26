import { formatImage } from "../helper/commonHelper";
import "../scss/components/group-table.scss"

const GroupTable = ({name, teams}) => {

    console.log(name)
    console.log(teams)
    /* Ui */
    return (
        <div>
            {/* head */}
            <div className="group-head">{name}</div>

            {/* body */}
            <table className="group-table"> 
                <tbody>
                    {
                        teams.map((team, index) => {
                            return (
                                <tr>
                                    <td className="td-g1">{index + 1}.</td>
                                    <td className="td-g2">
                                        
                                        <img src={formatImage(team.image)} alt=" " width="24px" height="24px"/>
                                        <h3>{team.name}</h3>
                                    </td>
                                    <td className="td-g3">{`${team.win}-${team.lose}-${team.draw}`}</td>
                                    <td className="td-g4">{`${team.gWon}-${team.gLose}`}</td>
                                    <td className="td-g5">{team.pts}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default GroupTable;