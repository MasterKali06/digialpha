import { BsChevronLeft, BsChevronRight, BsCaretUp } from "react-icons/bs";
import { useRef, useState } from "react"
import Carousel from "../../components/carousel";
import { gameColorList, gameShadowList, PAGE_TRANSITION, PAGE_VARIANTS } from "../../constants/constants";
import { useSelector } from "react-redux"
import "../../scss/pages/calendar/calendar-live.scss";
import CalendarMatches from "./calendar-matches"
import { PropagateLoader } from "react-spinners"
import { motion } from "framer-motion";


const CalendarLive = () => {

    const gameId = useSelector(state => state.gameId)
    // retrieving live matches
    const ongoing = useSelector(state => state.ongoingMatches)


    // carousel btns
    const NextArrow = ({ onClick }) => {
        return (
            <div className="next-arrow" style={{ color: gameColorList[gameId] }} onClick={onClick}>
                <BsChevronRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="prev-arrow" style={{ color: gameColorList[gameId] }} onClick={onClick}>
                <BsChevronLeft />
            </div>
        );
    };


    // past upcoming container open -- close
    const [matchesMenuOpen, setMatchesMenuOpen] = useState(false);

    const matchesBtnClicked = () => {
        setMatchesMenuOpen(!matchesMenuOpen)
    }


    const mRef = useRef()


    return (
        <motion.div initial="out" animate="in" exit="out" variants={PAGE_VARIANTS} transition={PAGE_TRANSITION} className="calendar-body">

            <div className={matchesMenuOpen ? "live-header header-transit" : "live-header"} style={{
                textShadow: [
                    "0 0 2px var(--main-light)",
                    "0 0 4px var(--main-light)",
                    "0 0 6px var(--main-light)",
                    "0 0 8px var(--main-light)",
                    `0 0 10px ${gameShadowList[gameId]}`]
            }}>
                {matchesMenuOpen ? "Matches" : "Live"}
            </div>

            <div className="live-container">

                <PrevArrow onClick={() => { mRef.current.prevClicked() }} />
                <div className="live-slideshow">
                    {
                        // loading
                        ongoing.loading ?
                            <PropagateLoader color={gameColorList[gameId]} loading={ongoing.loading} />
                            :
                            // live matches loaded
                            ongoing.matches.length > 0 ?
                                <Carousel ref={mRef} cards={ongoing} matchesOpen={matchesMenuOpen} />

                                // no live matches
                                : <></>

                    }
                </div>

                <NextArrow onClick={() => { mRef.current.nextClicked() }} />
            </div>



            <div className={matchesMenuOpen ? "matches-body opened" : "matches-body"} >

                <div className="open-close-btn" onClick={() => matchesBtnClicked()}>
                    <BsCaretUp className={matchesMenuOpen ? "up-icon rotate" : "up-icon"}
                        style={{ color: gameColorList[gameId], transition: "transform 0.8s" }}
                    />
                </div>

                {/* past and upcoming matches container */}
                <CalendarMatches />


            </div>
        </motion.div>
    )
}


export default CalendarLive;