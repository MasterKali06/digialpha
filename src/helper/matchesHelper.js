import { gameNameList } from "../constants/constants";



export const getMatchesModel = (match) => {

    const opponents = match.opponents
    const serie = match.serie

    let team1 = gameNameList[match.game_id];
    let team1Img;

    let team2 = gameNameList[match.game_id];
    let team2Img;

    let tournament = gameNameList[match.game_id];
    let tourImg;

    if (opponents[0]) {
        if (opponents[0].name === "TBD") {
            team1 = "TBD"
        } else {
            team1 = opponents[0].name
            if (opponents[0].image) {
                team1Img = `data:image/png;base64,${opponents[0].image.trim()}`
            }
        }
    }

    if (opponents[1]) {
        if (opponents[1].name === "TBD") {
            team2 = "TBD"
        } else {
            team2 = opponents[1].name
            if (opponents[1].image) {
                team2Img = `data:image/png;base64,${opponents[1].image.trim()}`
            }
        }
    }



    if (serie) {
        if (serie.name) {
            tournament = serie.name
        }

        if (serie.image) {
            tourImg = `data:image/png;base64,${serie.image.trim()}`
        }
    }



    const tag = match.name


    return {
        id: match.id,
        gameId: match.game_id,
        tag: tag,
        team1: team1,
        img1: team1Img,
        team2: team2,
        img2: team2Img,
        tournament: tournament,
        tourImg: tourImg
    }
}


export const calculateTimeLeft = (time) => {
    let difference = +new Date(parseInt(time)) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
}


export const handleMatchResult = (id, results) => {

    if (results && results.length > 1){
        if (results[0].id === id){
            return results[0].score
        }else{
            return results[1].score
        }
    }
    return 0
}