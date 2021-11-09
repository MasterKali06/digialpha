import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMatches } from "../../redux/actions/getMatches";
import CalendarLive from "./calendar-live";
import axios from "axios"
import { changePageId } from "../../redux/actions/changeId";

function Calendar() {

  const gameId = useSelector(state => state.gameId)

  // dispatching live matches
  const dispatch = useDispatch()
  useEffect(() => {
    let source = axios.CancelToken.source();


    dispatch(getMatches(gameId, "running", source))
    dispatch(changePageId(1))


    return () => {
      source.cancel()
    }

  }, [gameId, dispatch])


  return (
    <CalendarLive />
  );
}



export default Calendar;
