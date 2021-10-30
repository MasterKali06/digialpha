import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMatches } from "../../redux/actions/getMatches";
import CalendarLive from "./calendar-live";

function Calendar() {

  const gameId = useSelector(state => state.gameId)

  // dispatching live matches
  const dispatch = useDispatch()
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getMatches(gameId, "running", mounted))
    }

    return () => {
      mounted = false
    }

  }, [gameId, dispatch])


  return (
    <CalendarLive />
  );
}



export default Calendar;
