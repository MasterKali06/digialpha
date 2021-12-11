import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../scss/pages/match/match.scss"
import OpponentCard from "../../components/opponent-card";
import { requestHeadToHead, requestMatch, requestTeam } from "../../helper/request";
import GameCard from "../../components/game-card";
import { SyncLoader } from "react-spinners";
import { gameColorList, gameLogoList, PAGE_TRANSITION, PAGE_VARIANTS } from "../../constants/constants";
import axios from "axios";
import TeamDetails from "../../components/team-details";
import HeadToHead, { HthBar } from "../../components/head-to-head";
import Layout from "../../layout/Layout"
import MasterPieChart from "../../components/pie-chart";
import SerieMenuButton from "../../components/serie-menu-button";
import { motion } from "framer-motion";
import MirrorBar from "../../components/mirror-bar"


// images
import Particles from "react-tsparticles";
import { getHeadToHeadWinRate } from "../../helper/tournametsHelper";
import config from "../../assets/json/match-particles.json"



const Match = () => {

    var matchId = useSelector(state => state.matchId)
    var gameId = useSelector(state => state.gameId)


    let mode;
    switch (matchId.status) {
        case "not_started":
            mode = "upcoming"
            break;
        case "running":
            mode = "running"
            break;
        default:
            mode = "past"
    }

    const [match, setMatch] = useState(null)
    const [teamOne, setTeamOne] = useState(null)
    const [teamTwo, setTeamTwo] = useState(null)
    const [teams, setTeams] = useState(null)
    const [vidToPlay, setVidToPlay] = useState(null)
    const [headToHead, setHeadToHead] = useState(null)
    const [tabContainer, setTabContainer] = useState(1)

    const alterImg = gameLogoList[gameId]


    useEffect(() => {
        let source = axios.CancelToken.source()

        var matchData = requestMatch(gameId, mode, matchId.id, source)
        matchData
            .then(data => {
                if (data) {

                    // set match
                    setMatch(data)
                    // handle archives and add them to videos
                    if (data.archive) {
                        if (data.archive.videos.length > 0) {
                            setVidToPlay({
                                idx: 1,
                                video: data.archive.videos[0].url
                            })
                        }
                    }

                    // set teams
                    setTeamOne(data.opponents[0])
                    setTeamTwo(data.opponents[1])
                    setTeams(
                        { t1: data.opponents[0].id, t2: data.opponents[1].id }
                    )

                    // console.log("match, teams and video set")

                }
            })
            .catch(err => console.log(err.message))

        return () => {
            source.cancel()
        }

    }, [])

    useEffect(() => {
        let source = axios.CancelToken.source()

        if (teams) {
            if (teams.t1 && teams.t2) {
                console.log("in effect 2")
                var headData = requestHeadToHead(gameId, teams.t1, teams.t2, source)
                headData.then(data => {
                    setHeadToHead(data)
                    console.log(data)


                }).catch(err => {
                    if (axios.isCancel(err)) {
                        console.log("canceled")
                    }
                })
            }
        }

        return () => {
            source.cancel()
        }

    }, [teams])


    var imgAvailable = false;
    let tourImg;
    if (match) {
        if (match.serie) {
            if (match.serie.image) {
                imgAvailable = true
                tourImg = `data:image/png;base64,${match.serie.image}`
            }
        }
    }


    const gameCardClicked = (idx) => {
        if (idx === vidToPlay.idx) {
            return
        } else {
            if (idx === 1) {
                setVidToPlay({
                    idx,
                    video: match.archive.videos[0].url
                })
            }
            if (idx === 2) {
                setVidToPlay({
                    idx,
                    video: match.archive.videos[1].url
                })
            }
            if (idx === 3) {
                setVidToPlay({
                    idx,
                    video: match.archive.videos[2].url
                })
            }
            if (idx === 4) {
                setVidToPlay({
                    idx,
                    video: match.archive.videos[3].url
                })
            }
            if (idx === 5) {
                setVidToPlay({
                    idx,
                    video: match.archive.videos[4].url
                })
            }
        }
    }

    const VideoContent = () => {

        console.log("vidToPlay", vidToPlay)

        return (
            <div className="video-content-box">
                {

                    mode === "past" ?
                        vidToPlay ?
                            <iframe
                                className="live-iframe"
                                src={vidToPlay.video}
                                allowfullscreen="true"
                                scrolling="no"
                                height="100%"
                                width="100%"
                                title={vidToPlay.idx}>
                            </iframe>
                            :
                            // archive not available
                            <div className="no-archive">
                                {/* <img src={CSGO} alt=" " className="no-archive-img" /> */}
                                <h3>Sorry! No Archive Availabe...</h3>
                            </div>

                        :
                        match.streams_list.length > 0 ?
                            <iframe
                                className="live-iframe"
                                src={`${match.streams_list[0].url}&localhost`}
                                allowfullscreen="true"
                                scrolling="no"
                                height="100%"
                                width="100%"
                                title={match.id}>
                            </iframe>
                            :
                            // no live stream
                            <div className="no-archive">
                                {/* <img src={CSGO} alt=" " className="no-archive-img" /> */}
                            </div>

                }
            </div>
        )
    }

    const GameButtons = () => (
        <>
            {
                match.archive &&
                <div className="games">
                    {match.archive.videos.length > 0 && <GameCard idx={1} gameCardClicked={() => gameCardClicked(1)} isActive={vidToPlay ? vidToPlay.idx === 1 : false} />}
                    {match.archive.videos.length > 1 && <GameCard idx={2} gameCardClicked={() => gameCardClicked(2)} isActive={vidToPlay ? vidToPlay.idx === 2 : false} />}
                    {match.archive.videos.length > 2 && <GameCard idx={3} gameCardClicked={() => gameCardClicked(3)} isActive={vidToPlay ? vidToPlay.idx === 3 : false} />}
                    {match.archive.videos.length > 3 && <GameCard idx={4} gameCardClicked={() => gameCardClicked(4)} isActive={vidToPlay ? vidToPlay.idx === 4 : false} />}
                    {match.archive.videos.length > 4 && <GameCard idx={5} gameCardClicked={() => gameCardClicked(5)} isActive={vidToPlay ? vidToPlay.idx === 5 : false} />}
                </div>
            }
        </>
    )

    const MatchTour = () => (
        <div className="match-tour">
            <img className="tour-logo" src={imgAvailable ? tourImg : alterImg} alt=" " />
            <div className="tour-name">{match ? match.serie ? match.serie.name : "" : ""}</div>
        </div>
    )

    const OpponentDetail = ({ num, team }) => (
        <div className="opponent-details">
            <OpponentCard team={{ num: num, detail: team }} match={match} />
        </div>
    )

    // TODO: change div width to 100% when its tab-land
    const HeadToHeadComp = () => {
        if (!headToHead) {
            return <></>
        }

        const pc = getHeadToHeadWinRate(headToHead, teamOne)

        return (
            <div style={{ width: "50%" }}>
                <div className="headtohead-container">
                    <div className="hth-bar">
                        <MirrorBar percent={pc.teamOnePercent} name={teamOne && teamOne.name} />
                        <MirrorBar percent={pc.teamTwoPercent} name={teamTwo && teamTwo.name} />
                    </div>
                    <HeadToHead data={headToHead} teamOne={teamOne && teamOne.id} teamTwo={teamTwo && teamTwo.id} />
                </div>
            </div>
        )
    }



    console.log(match)


    return (
        <Layout>
            {
                match ?
                    <>
                        <Particles className="particles__container" params={config} />

                        <motion.div initial="out" exit="out" animate="in" variants={PAGE_VARIANTS} transition={PAGE_TRANSITION} className="match-container">

                            <MatchTour />

                            <div className="video-container">
                                <OpponentDetail num={0} team={teamOne} />

                                <div className="video-content">
                                    <GameButtons />
                                    <VideoContent />
                                </div>

                                <OpponentDetail num={1} team={teamTwo} />
                            </div>

                            {/* video container responsive */}
                            <div className="res-video-container">
                                <GameButtons />
                                <VideoContent />

                                <div className="res-opp">
                                    <OpponentDetail num={0} team={teamOne} />
                                    <OpponentDetail num={1} team={teamTwo} />
                                </div>
                            </div>


                            {/* head to head title */}
                            <div className="headtohead-divider">
                                <div className="shadow"></div>
                            </div>

                            <div className="detail-container">
                                <div style={{ width: "25%" }}>
                                    <MasterPieChart stat={match.stats && match.stats.teamOneStat} />
                                </div>

                                <HeadToHeadComp />

                                <div style={{ width: "25%" }}>
                                    <MasterPieChart stat={match.stats && match.stats.teamTwoStat} />
                                </div>
                            </div>


                            <MatchTabContainer active={tabContainer} tabClicked={(idx) => setTabContainer(idx)} />
                            <div className="tab-container">
                                {tabContainer === 0 &&
                                    <div className="intab">
                                        <MasterPieChart stat={match.stats && match.stats.teamOneStat} />
                                    </div>
                                }

                                {
                                    tabContainer === 1 &&
                                    <div className="intab">
                                        <HeadToHeadComp />
                                    </div>
                                }

                                {tabContainer === 2 &&
                                    <div className="intab">
                                        <MasterPieChart stat={match.stats && match.stats.teamTwoStat} />
                                    </div>
                                }

                            </div>

                        </motion.div>
                    </>
                    // loading
                    :
                    <div className="loading-container">
                        <SyncLoader color={gameColorList[gameId]} loading={!match} speedMultiplier={0.8} />
                    </div>

            }
        </Layout>

    )
}


const MatchTabContainer = ({ active, tabClicked }) => {

    return (
        <div className="match-tab-menu">
            <SerieMenuButton
                title="team one details"
                active={active === 0}
                tabClicked={() => tabClicked(0)}
            />

            <SerieMenuButton
                title="head to head"
                active={active === 1}
                tabClicked={() => tabClicked(1)}
            />

            <SerieMenuButton
                title="team two details"
                active={active === 2}
                tabClicked={() => tabClicked(2)}
            />

        </div>
    )
}

export default Match;