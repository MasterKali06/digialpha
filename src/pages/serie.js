import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestSerie } from "../helper/request";
import { getGroupRankings } from "../helper/tournametsHelper";


const Serie = () => {

    const gameId = useSelector(state => state.gameId)
    const { id, type, year } = useSelector(state => state.serieId)

    const [serie, setSerie] = useState(null)

    useEffect(() => {
        const source = axios.CancelToken.source()
        const response = requestSerie(gameId, type, id, year, source)
        response.then(data =>
            setSerie(data[0])
        ).catch(err => console.log(err.message))
        return () => source.cancel()
    }, [])

    // group ranking
    let groupRanking;
    if (serie) {
        groupRanking = getGroupRankings(serie.tournaments)
    }


    let playoffTags = [];
    // playoffs
    if (serie) {
        const tours = serie.tournaments
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].name.includes("Playoffs")) {
                const matches = tours[i].matches
                matches.forEach(element => {
                    if (element.status !== "canceled") {
                        playoffTags.push(element.name)
                    }
                });
            }
        }
    }
    return (
        <>
            <div>
                {
                    playoffTags.map(tag => (
                        <div>{tag}</div>
                    ))
                }
            </div>
        </>
    )
}

export default Serie;