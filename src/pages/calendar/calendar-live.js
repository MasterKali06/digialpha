import { BsChevronLeft, BsChevronRight, BsCaretUp } from "react-icons/bs";
import { useRef, useState } from "react"
import Carousel from "../../components/carousel";
import { gameColorList, gameShadowList } from "../../constants/constants";
import { useSelector } from "react-redux"
import "../../scss/pages/calendar/calendar-live.scss";
import CalendarMatches from "./calendar-matches"


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


    // const test = {
    //   matches: [
    //     { id: 1 },
    //     { id: 2 },
    //     { id: 3 },
    //     { id: 4 },
    //     { id: 5 },
    //     { id: 6 },
    //     { id: 7 },
    //   ]
    // }

    const mRef = useRef()

    return (
        <div className="calendar-body">

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
                <div className={matchesMenuOpen ? "live-slideshow slideshow-transit" : "live-slideshow"}>
                    {
                        ongoing.matches.length > 0 ?
                            <Carousel ref={mRef} cards={ongoing} />

                            // no live matches container goes here
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

                {/* matches container */}
                <CalendarMatches />


            </div>
        </div >
    )
}


export default CalendarLive;