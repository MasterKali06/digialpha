import "../scss/pages/calendar/calendar.scss";
import { useDispatch, useSelector } from "react-redux"
import { getMatches } from "../redux/actions/getMatches";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useRef, useState } from "react"
import Carousel from "../components/carousel";
import { gameColorList } from "../constants/constants";

function Calendar() {

  const gameId = useSelector(state => state.gameId)

  // dispatching all the matches
  const modes = ["running", "upcoming", "past"]
  const dispatch = useDispatch()
  modes.map(mode => (
    dispatch(getMatches(gameId, mode))
  ))

  return (
    <CalendarPage gameId={gameId} />
  );
}

const CalendarPage = (props) => {

  // retrieving all the matches
  const upcoming = useSelector(state => state.upcomingMatchesReducer)
  const ongoing = useSelector(state => state.ongoingMatches)
  const past = useSelector(state => state.pastMatchesReducer)

  const NextArrow = ({ onClick }) => {
    return (
      <div className="next-arrow" style={{ color: gameColorList[props.gameId] }} onClick={onClick}>
        <BsChevronRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="prev-arrow" style={{ color: gameColorList[props.gameId] }} onClick={onClick}>
        <BsChevronLeft />
      </div>
    );
  };


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

      <div className="live-container">

        <PrevArrow onClick={() => { mRef.current.prevClicked() }} />
        <div className="live-slideshow">
          {
            ongoing.matches.length > 0 ?
              <Carousel ref={mRef} cards={ongoing} />
              : <></>
          }
        </div>

        <NextArrow onClick={() => { mRef.current.nextClicked() }} />
      </div>
    </div>
  )
}

export default Calendar;
