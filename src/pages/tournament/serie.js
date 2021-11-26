import axios from "axios";
import "../../scss/pages/tournaments/serie.scss"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupTable from "../../components/group-table";
import { requestSerie, requestTournament } from "../../helper/request";
import Layout from "../../layout/Layout"

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
            if (serie){
                if (serie.tournaments){
                    for (let i = 0; i < serie.tournaments.length; i++){
                        const curr = serie.tournaments[i]
                        try{
                            console.log("trying to fetch data")
                            const data = await requestTournament(gameId, curr.id, source)
                            result.push(data)
                        }catch (err) {
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
    console.log(tours)

    return (
        <Layout>
            <div className="serie-body">
                {
                    tours && 
                        tours.map(tour => {
                            
                            if (tour.details && tour.details.name){
                            if (tour.details.name.toLowerCase().includes("group")){
                                return (
                                    <GroupTable name={tour.details.name} teams={tour.details.teams} />
                                )
                            }
                        }
                        return <></>
                    })
                }
            </div>
        </Layout>
    )
}

export default Serie;
