import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../scss/pages/match/match.scss"
import OpponentCard from "../../components/opponent-card";
import { requestHeadToHead, requestMatch, requestTeam } from "../../helper/request";
import GameCard from "../../components/game-card";
import { SyncLoader } from "react-spinners";
import { gameColorList, gameLogoList } from "../../constants/constants";
import axios from "axios";
import TeamDetails from "../../components/team-details";
import HeadToHead from "../../components/head-to-head";
import Layout from "../../layout/Layout"

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
                                video: data.archive.videos[0]
                            })
                        }
                    }

                    // set teams
                    setTeamOne(data.opponents[0])
                    setTeamTwo(data.opponents[1])
                    setTeams(
                        { t1: data.opponents[0].id, t2: data.opponents[1].id }
                    )

                    console.log("match, teams and video set")

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

    const VideoContent = () => (
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
                            Sorry! No archive...
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
                            Sorry! No Live Stream...
                        </div>

            }
        </div>
    )

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

    console.log(match)


    return (
        <Layout>
            {
                match ?
                    <div className="match-container">

                        <div className="match-tour">
                            {/* logo and serie name goes here */}
                            <img className="tour-logo" src={imgAvailable ? tourImg : alterImg} alt=" " />
                            <div className="tour-name">{match ? match.serie ? match.serie.name : "" : ""}</div>


                        </div>
                        <div className="video-container">
                            <div className="opponent-details">
                                <OpponentCard team={{ num: 0, detail: teamOne }} match={match} />
                            </div>

                            <div className="video-content">
                                <GameButtons />
                                <VideoContent />
                            </div>

                            <div className="opponent-details">
                                <OpponentCard team={{ num: 1, detail: teamTwo }} match={match} />
                            </div>
                        </div>


                        {/* responsive */}
                        <div className="res-video-container">
                            <GameButtons />
                            <VideoContent />

                            <div className="res-opp">
                                <div className="opponent-details">
                                    <OpponentCard team={{ num: 0, detail: teamOne }} match={match} />
                                </div>

                                <div className="opponent-details">
                                    <OpponentCard team={{ num: 1, detail: teamTwo }} match={match} />
                                </div>
                            </div>
                        </div>

                        {/* add divider maybe */}

                        <div className="detail-container">
                            <TeamDetails stats={match.stats ? match.stats.teamOneStat : null} />
                            <HeadToHead data={headToHead} teamOne={teamOne ? teamOne.id : null} teamTwo={teamTwo ? teamTwo.id : null} />
                            <TeamDetails stats={match.stats ? match.stats.teamTwoStat : null} />
                        </div>

                        <div className="tab-container">

                        </div>

                    </div>

                    // loading
                    :
                    <div className="loading-container">
                        <SyncLoader color={gameColorList[gameId]} loading={!match} speedMultiplier={0.8} />
                    </div>

            }

        </Layout>

    )
}

export default Match;