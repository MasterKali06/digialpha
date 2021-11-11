import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSeries } from "../redux/actions/getSeries";
import { gameColorList } from "../constants/constants"
import "../scss/pages/tournaments/tournaments.scss";
import { FadeLoader } from "react-spinners";
import { arrangeToursByTier } from "../helper/tournametsHelper";
import Table from "../components/tournaments-table";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { changePageId } from "../redux/actions/changeId";
import { changePastTourState, changeRunningTourState, changeUpcomingTourState } from "../redux/actions/tourPersistState";

const Tournaments = () => {

    const gameId = useSelector(state => state.gameId)

    const runningDispatched = useSelector(state => state.runningSerieState)
    const upcomingDispatched = useSelector(state => state.upcomingSerieState)
    const pastDispatched = useSelector(state => state.pastSerieState)

    const dispatch = useDispatch()


    // TODO: check this closing tab
    useEffect(() => {
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault()
            dispatch(changePastTourState(false))
            dispatch(changeRunningTourState(false))
            dispatch(changeUpcomingTourState(false))
        })

    }, [])

    useEffect(() => {
        const source = axios.CancelToken.source()

        if (!runningDispatched) {
            dispatch(getSeries(gameId, "running", source))
            dispatch(changeRunningTourState(true))
        }
        if (!upcomingDispatched) {
            dispatch(getSeries(gameId, "upcoming", source))
            dispatch(changeUpcomingTourState(true))
        }
        dispatch(changePageId(2))

        return () => {
            source.cancel()
        }
    }, [dispatch, gameId])


    const [year, setYear] = useState(2021)
    useEffect(() => {
        const source = axios.CancelToken.source()


        if (!pastDispatched) {
            dispatch(getSeries(gameId, "past", source, year))
            dispatch(changePastTourState(true))
        }

        return () => {
            source.cancel()
        }
    }, [year, dispatch, gameId])


    return (
        <TournamentsUi
            gameId={gameId}
            year={year}
        />
    )
}

const TournamentsUi = ({ gameId, year }) => {

    const ongoing = useSelector(state => state.ongoingSeries)
    const upcoming = useSelector(state => state.upcomingSeries)
    const past = useSelector(state => state.pastSeries)
    const loading = ongoing.loading || upcoming.loading || past.loading

    const [tabSelected, setSelectedTab] = useState(1)
    const [state, setState] = useState([true, true, true, true, true])

    const tournaments = arrangeToursByTier(
        tabSelected === 0 ? past : tabSelected === 1 ? ongoing : upcoming
    )


    const onTabClicked = (index) => {
        setSelectedTab(index)
    }

    const changeTableState = (idx) => {
        const newState = state.map((item, index) => (index === idx ? item = !item : item))
        setState(newState)
    }


    const generateTable = (list, index, text) => {
        if (list.length > 0) {

            let type;
            switch (tabSelected) {
                case 0:
                    type = "past"
                    break
                case 1:
                    type = "running"
                    break
                default:
                    type = "upcoming"
            }

            return (
                <>
                    <Header text={text} open={state[index]} changeTableState={() => changeTableState(index)} />
                    {<Table gameId={gameId} tourList={list} state={state[index]} type={type} year={year} />}
                </>
            )
        }
    }

    const generateTab = (index, text) => {
        return (
            <h1
                className={tabSelected === index ? "tab-anim" : ""}
                style={tabSelected === index ? { color: gameColorList[gameId] } : {}}
                onClick={() => onTabClicked(index)}
            >{text}</h1>
        )
    }

    return (
        <div className="tour-body">
            <div className="tour-tabs">
                {generateTab(0, "Past")}
                {generateTab(1, "Running")}
                {generateTab(2, "Upcoming")}
            </div>

            {
                loading ?
                    <div className="tour-loading">
                        <FadeLoader speedMultiplier={0.8} color={gameColorList[gameId]} loading={loading} />
                    </div>
                    :
                    <>
                        {
                            tournaments &&
                            <div className="table-container">
                                {generateTable(tournaments.s, 0, "S Tier")}
                                {generateTable(tournaments.a, 1, "A Tier")}
                                {generateTable(tournaments.b, 2, "B Tier")}
                                {generateTable(tournaments.c, 3, "C Tier")}
                                {generateTable(tournaments.d, 4, "D Tier")}
                            </div>
                        }
                    </>
            }
        </div>
    );
}


const Header = ({ text, open, changeTableState }) => {
    return (

        <div className="thead-tier">
            <h1>{text}</h1>
            {
                open ?
                    <VscChevronUp onClick={changeTableState} className="t-oc-btn" />
                    :
                    <VscChevronDown onClick={changeTableState} className="t-oc-btn" />
            }
        </div>
    )
}

export default Tournaments;