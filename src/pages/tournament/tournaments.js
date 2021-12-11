import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSeries } from "../../redux/actions/getSeries";
import { colors, gameColorList, PAGE_TRANSITION, PAGE_VARIANTS } from "../../constants/constants"
import "../../scss/pages/tournaments/tournaments.scss";
import { FadeLoader } from "react-spinners";
import { arrangeToursByTier } from "../../helper/tournametsHelper";
import Table from "../../components/tournaments-table";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { changePageId } from "../../redux/actions/changeId";
import { changePastTourState, changeRunningTourState, changeUpcomingTourState } from "../../redux/actions/tourPersistState";
import Layout from "../../layout/Layout";
import { AnimatePresence, motion } from "framer-motion";


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
        <Layout>
            <TournamentsUi
                gameId={gameId}
                year={year}
            />
        </Layout>
    )
}

const TournamentsUi = ({ gameId, year }) => {

    const ongoing = useSelector(state => state.ongoingSeries)
    const upcoming = useSelector(state => state.upcomingSeries)
    const past = useSelector(state => state.pastSeries)
    const loading = ongoing.loading || upcoming.loading || past.loading

    const [tabSelected, setSelectedTab] = useState(1)
    const [state, setState] = useState([true, true, true, true, true])
    const tournamentsUpdated = useRef(false)

    const [tournaments, setTournaments] = useState(null)
    useEffect(() => {
        if (!tournamentsUpdated.current && past.series.length > 0 && ongoing.series.length > 0 && upcoming.series.length > 0)
        {   
            setTournaments({
                past: arrangeToursByTier(past),
                running: arrangeToursByTier(ongoing),
                upcoming: arrangeToursByTier(upcoming)
            })
            tournamentsUpdated.current = true
        }
    }, [past, ongoing, upcoming])

    let pastTours, ongoingTours, upcomingTours;
    if (tournaments){
        pastTours = tournaments.past
        ongoingTours = tournaments.running
        upcomingTours = tournaments.upcoming
    }

    const onTabClicked = (index) => {
        setSelectedTab(index)
    }

    const changeTableState = (idx) => {
        const newState = state.map((item, index) => (index === idx ? item = !item : item))
        setState(newState)
    }


    const generateTable = (list, index, text) => {
        if (list.length > 0) {

            return (
                <>
                    <Header text={text} open={state[index]} changeTableState={() => changeTableState(index)} />
                    <Table gameId={gameId} tourList={list} state={state[index]} />
                </>
            )
        }
    }


    const generateTab = (index, text) => {
        return (
            <h1
                className={tabSelected === index ? "tab-anim" : ""}
                onClick={() => onTabClicked(index)}
            >{text}</h1>
        )
    }

    return (
        <motion.div initial="out" animate="in" exit="out" variants={PAGE_VARIANTS} transition={PAGE_TRANSITION} className="tour-body">
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
                        <AnimatePresence exitBeforeEnter>
                            { pastTours && tabSelected === 0 &&
                                <motion.div initial="in" exit="exit" animate="out" variants={tableVariants} className="table-container">
                                    {generateTable(pastTours.s, 0, "S Tier")}
                                    {generateTable(pastTours.a, 1, "A Tier")}
                                    {generateTable(pastTours.b, 2, "B Tier")}
                                    {generateTable(pastTours.c, 3, "C Tier")}
                                    {generateTable(pastTours.d, 4, "D Tier")}
                                </motion.div>
                            }
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter>
                            { ongoingTours && tabSelected === 1 &&
                                <motion.div initial="in" exit="exit" animate="out" variants={tableVariants} className="table-container">
                                    {generateTable(ongoingTours.s, 0, "S Tier")}
                                    {generateTable(ongoingTours.a, 1, "A Tier")}
                                    {generateTable(ongoingTours.b, 2, "B Tier")}
                                    {generateTable(ongoingTours.c, 3, "C Tier")}
                                    {generateTable(ongoingTours.d, 4, "D Tier")}
                                </motion.div>
                            }
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter>
                            { upcomingTours && tabSelected === 2 &&
                                <motion.div initial="in" exit="exit" animate="out" variants={tableVariants} className="table-container">
                                    {generateTable(upcomingTours.s, 0, "S Tier")}
                                    {generateTable(upcomingTours.a, 1, "A Tier")}
                                    {generateTable(upcomingTours.b, 2, "B Tier")}
                                    {generateTable(upcomingTours.c, 3, "C Tier")}
                                    {generateTable(upcomingTours.d, 4, "D Tier")}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </>   
            }
        </motion.div>
    );
}


const tableVariants = {
    "in": { opacity: 0, transition: { duration: 0.5 } },
    "out": { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    "exit": { opacity: 0, transition: { duration: 0.5 } },
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