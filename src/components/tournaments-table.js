import { gameColorList } from "../constants/constants";
import { formatImage } from "../helper/commonHelper";
import { formatDate } from "../helper/tournametsHelper";
import "../scss/pages/tournaments/tour-table.scss";
import "../scss/pages/tournaments/tour-card.scss";
import { BsTrophy } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changeSerieId } from "../redux/actions/changeId";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";


const Table = ({ gameId, tourList, state }) => {

    const isTabland = useMediaQuery({ query: '(max-width: 1024px)' })

    const dispatch = useDispatch()
    const history = useHistory()
    const onSerieClicked = (id) => {
        dispatch(changeSerieId(id))
        history.push("./serie")
    }

    const tableVariants = {
        "in": { opacity: 0, y: "-40px", transition: {duration: 1, type: "linear"} },
        "out": { opacity: 1, y: "0", transition: { duration: 1, type: "linear" } }
    }
    

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                { !isTabland && state && (<motion.table initial="in" exit="in" animate="out" variants={tableVariants} className="tour-table">
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
                                let winnerId = ""
                                if (item.winner_id) {
                                    winnerId = item.winner_id.name
                                }

                                const start = formatDate(item.begin_at)
                                const end = formatDate(item.end_at)

                                let prizepool;
                                for (let i = 0; i < item.tournaments.length; i++) {
                                    const curr = item.tournaments[i]
                                    if (curr.prizepool) {
                                        prizepool = curr.prizepool
                                        break
                                    }
                                }

                                return (
                                    <tr>
                                        <td className="td-1" onClick={() => onSerieClicked(item.id)}>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src={item.image ? formatImage(item.image) : ""} alt=" " width="36px" height="36px" style={{ marginRight: "15px" }} />
                                                <div className="td-tour-name">{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="td-2">{item.season && item.season !== "None" ? item.season : "Regular"}</td>
                                        <td className="td-3">{start ? start : ""}</td>
                                        <td className="td-4">{end ? end : ""}</td>
                                        <td className="td-5">{winnerId ? winnerId : "TBD"}</td>
                                        <td className="td-6">{prizepool}</td>
                                        <td className="td-7">{item.url !== "None" && <a href={item.url}>Visit Site</a>}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </motion.table>)}
            </AnimatePresence>

            {/* tour card */}
            
                {/* <motion.div initial="in" exit="in" animate="out" variants={tableVariants} > */}
                {
                    isTabland && state &&
                    tourList.map((item, index) => {

                        let winnerId = ""
                        if (item.winnerId) {
                            winnerId = item.winner_id.name
                        }

                        const start = formatDate(item.begin_at)
                        const end = formatDate(item.end_at)


                        return (
                            <div className={index % 2 ? "tour-card t-odd" : "tour-card t-even"}
                                style={{ "--bgColor": gameColorList[gameId] }} onClick={() => onSerieClicked(item.id)}
                            >
                                <div className="image">
                                    <img src={item.image ? formatImage(item.image) : ""} alt=" " width="96px" height="96px" style={{ marginRight: "15px" }} />
                                </div>

                                <div className="contentBx">

                                    <div className="name">{item.name}</div>

                                    <div className="winner">
                                        <BsTrophy className="tour-icons" />
                                        <h3>{winnerId ? winnerId : "TBD"}</h3>
                                    </div>

                                    {
                                        item.prizepool !== "None" &&
                                        <div className="prize">
                                            <FaRegMoneyBillAlt className="tour-icons" />
                                            <h3>{item.prizepool}</h3>
                                        </div>

                                    }

                                    <div className="date">
                                        <MdOutlineDateRange className="tour-icons" />
                                        <h3>{start} -- {end}</h3>
                                    </div>

                                    <div className="more">
                                        <h3><a href={item.url}>visit site</a></h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                {/* </motion.div> */}
        </>
    )
}

export default Table;