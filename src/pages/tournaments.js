import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSeries } from "../redux/actions/getSeries";
import { gameColorList } from "../constants/constants"
import "../scss/pages/tournaments/tournaments.scss";
import { FadeLoader } from "react-spinners";
import { arrangeToursByTier, formatDate } from "../helper/tournametsHelper";
import Table from "../components/tournaments-table";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

const Tournaments = () => {

    const gameId = useSelector(state => state.gameId)

    const dispatch = useDispatch()

    useEffect(() => {
        const source = axios.CancelToken.source()

        dispatch(getSeries(gameId, "running", source))
        dispatch(getSeries(gameId, "upcoming", source))

        return () => {
            source.cancel()
        }
    }, [])


    const [year, setYear] = useState(2021)
    useEffect(() => {
        const source = axios.CancelToken.source()

        dispatch(getSeries(gameId, "past", source, year))

        return () => {
            source.cancel()
        }
    }, [year])


    return (
        <TournamentsUi
            gameId={gameId}
        />
    )
}

const TournamentsUi = ({ gameId }) => {

    const ongoing = useSelector(state => state.ongoingSeries)
    const upcoming = useSelector(state => state.upcomingSeries)
    const past = useSelector(state => state.pastSeries)
    const loading = ongoing.loading || upcoming.loading || past.loading

    const [tabSelected, setSelectedTab] = useState(1)
    const [state, setState] = useState([true, true, true, true, true])

    const tournaments = arrangeToursByTier(
        tabSelected === 0 ? past : tabSelected === 1 ? ongoing : upcoming
    )
    console.log(tournaments)


    const onTabClicked = (index) => {
        setSelectedTab(index)
    }

    const changeTableState = (idx) => {
        const newState = state.map((item, index) => (index === idx ? item = !item : item))
        setState(newState)
    }


    return (
        <div className="tour-body">
            <div className="tour-tabs">
                <h1
                    className={tabSelected === 0 ? "tab-anim" : ""}
                    style={tabSelected === 0 ? { color: gameColorList[gameId] } : {}}
                    onClick={() => onTabClicked(0)}
                >Past</h1>

                <h1
                    className={tabSelected === 1 ? "tab-anim" : ""}
                    style={tabSelected === 1 ? { color: gameColorList[gameId] } : {}}
                    onClick={() => onTabClicked(1)}
                >Running</h1>

                <h1
                    className={tabSelected === 2 ? "tab-anim" : ""}
                    style={tabSelected === 2 ? { color: gameColorList[gameId] } : {}}
                    onClick={() => onTabClicked(2)}
                >Upcoming</h1>
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
                                {tournaments.s.length ?
                                    <>
                                        <Header text="S tier" open={state[0]} changeTableState={() => changeTableState(0)} />
                                        {state[0] && <Table gameId={gameId} tourList={tournaments.s} />}
                                    </>
                                    : ""
                                }
                                {tournaments.a.length ?
                                    <>
                                        <Header text="A tier" open={state[1]} changeTableState={() => changeTableState(1)} />
                                        {state[1] && <Table gameId={gameId} tourList={tournaments.a} />}
                                    </>
                                    : ""
                                }
                                {tournaments.b.length ?
                                    <>
                                        <Header text="B tier" open={state[2]} changeTableState={() => changeTableState(2)} />
                                        {state[2] && <Table gameId={gameId} tourList={tournaments.b} />}
                                    </>
                                    : ""
                                }
                                {tournaments.c.length ?
                                    <>
                                        <Header text="C tier" open={state[3]} changeTableState={() => changeTableState(3)} />
                                        {state[3] && <Table gameId={gameId} tourList={tournaments.c} />}
                                    </>
                                    : ""
                                }
                                {tournaments.d.length ?
                                    <>
                                        <Header text="D tier" open={state[4]} changeTableState={() => changeTableState(4)} />
                                        {state[4] && <Table gameId={gameId} tourList={tournaments.d} />}
                                    </>
                                    : ""
                                }
                            </div>
                        }
                    </>
            }
        </div>
    );
}


const Header = ({ text, open, changeTableState }) => {
    console.log(open)
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