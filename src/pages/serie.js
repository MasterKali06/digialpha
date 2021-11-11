import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestSerie } from "../helper/request";
import { generatePlayoffs, getGroupRankings } from "../helper/tournametsHelper";


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


    // playoffs
    let playoffs;
    if (serie) {
        console.log(serie)
        const tours = serie.tournaments
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].name.toLowerCase().includes("playoffs")) {
                playoffs = generatePlayoffs(tours[i])
                break
            }
        }
    }


    return (
        <>
            <div>
                <PlayOffs playoffs={playoffs} />
            </div>
        </>
    )
}

export default Serie;


const PlayOffs = ({ playoffs }) => {


    const generatePlayoffUi = (round) => {
        return (
            <div style={{ padding: "10px" }}>
                {
                    round &&
                    round.map(match => (
                        <h6>{match.name}</h6>
                    ))
                }
            </div>
        )
    }


    return (
        <>
            {playoffs &&
                <div style={{ display: "flex", overflow: "auto" }}>
                    {generatePlayoffUi(playoffs.round64)}
                    {generatePlayoffUi(playoffs.round32)}
                    {generatePlayoffUi(playoffs.round16)}
                    {generatePlayoffUi(playoffs.round8)}
                    {generatePlayoffUi(playoffs.round4)}
                    {generatePlayoffUi(playoffs.final)}
                </div>}
        </>
    )

}