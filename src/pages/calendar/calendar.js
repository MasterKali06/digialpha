import { useDispatch, useSelector } from "react-redux"
import { getMatches } from "../../redux/actions/getMatches";
import CalendarLive from "./calendar-live";

function Calendar() {

  const gameId = useSelector(state => state.gameId)

  // dispatching live matches
  const dispatch = useDispatch()
  dispatch(getMatches(gameId, "running"))


  return (
    <CalendarLive />
  );
}



export default Calendar;
