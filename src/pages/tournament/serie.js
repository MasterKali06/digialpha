import axios from "axios";
import "../../scss/pages/tournaments/serie.scss"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupTable from "../../components/group-table";
import { requestSerie, requestTournament } from "../../helper/request";
import Layout from "../../layout/Layout"
import SerieMenu from "../../components/serie-menu";
import OverviewComp from "./overview";
import MirrorBar from "../../components/mirror-bar"


const Serie = () => {

    const gameId = useSelector(state => state.gameId)
    const id = useSelector(state => state.serieId)

    const [serie, setSerie] = useState(null)

    useEffect(() => {
        const source = axios.CancelToken.source()
        const response = requestSerie(gameId, id, source)
        response.then(data =>
            setSerie(data)
        ).catch(err => console.log(err.message))
        return () => source.cancel()
    }, [])

    const [tours, setTours] = useState(null)

    useEffect(() => {
        const source = axios.CancelToken.source()

        const fetchTours = async () => {
            let result = []
            if (serie) {
                if (serie.tournaments) {
                    for (let i = 0; i < serie.tournaments.length; i++) {
                        const curr = serie.tournaments[i]
                        try {
                            const data = await requestTournament(gameId, curr.id, source)
                            result.push(data)
                        } catch (err) {
                            console.log(err)
                        }
                    };
                    setTours(result)
                }
            }
        }

        fetchTours()

        return () => source.cancel()
    }, [serie])

    // 3 main components here
    // group table  --  group matches -- react flow (hierarchy tree)



    // playoff states
    const [playoffs, setPlayoffs] = useState([])

    // group states
    const [groups, setGroups] = useState([])

    const [activeTab, setActiveTab] = useState(0)
    const [allTeams, setAllTeams] = useState([])

    useEffect(() => {
        if (tours) {
            let teamsTemp = []
            let teamIds = []
            for (let i = 0; i < tours.length; i++) {
                const tour = tours[i]
                let playoffsTemp = []
                let groupsTemp = []

                if (tour.details && tour.details.name) {

                    // TODO: other types should add here like play-in and so on

                    if (tour.details.name === "playoff") {
                        playoffsTemp.push(tour)
                    }
                    if (tour.details.name === "group") {
                        groupsTemp.push(tour)
                    }
                }

                for (let i = 0; i < tour.teams.length; i++) {
                    const team = tour.teams[i]
                    if (!teamIds.includes(team.id)) {
                        teamIds.push(team.id)
                        teamsTemp.push(team)
                    }
                }
                setPlayoffs(playoffsTemp)
                setGroups(groupsTemp)
            }
            setAllTeams(teamsTemp)
        }
    }, [tours])


    // on active tab changed -- 0 - overview | 1 - group | 2 - playoff
    const activeTabChanged = (idx) => {

    }


    return (
        <Layout>
            <div className="serie-body">
                <SerieMenu tournaments={tours} activeTabChanged={activeTabChanged} />

                <div className="mirror-test">
                    <MirrorBar percent={50} name="og koosh" />
                    <MirrorBar percent={50} name="team liquid" />
                </div>

                {/* TODO: we need to add more options like play-in etc */}
                {
                    activeTab === 0 &&
                    <OverviewComp serie={serie} teams={allTeams} />
                }

                {/* {
                    activeTab === 1 &&
                        <GroupsComp />
                }

                {
                    activeTab === 2 &&
                        <PlayoffsComp />
                } */}

            </div>
        </Layout>
    )
}

export default Serie;
