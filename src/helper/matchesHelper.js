import { gameNameList } from "../constants/constants";



export const getMatchesModel = (match) => {

    let team1 = gameNameList[match.gameId];
    let team1Img;

    let team2 = gameNameList[match.gameId];
    let team2Img;

    let tournament = gameNameList[match.gameId];
    let tourImg;

    if (match.opponents[0]) {
        if (match.opponents[0] === "TBD") {
            team1 = "TBD"
        } else {
            team1 = match.opponents[0].name
            if (match.opponents[0].image.length > 0 && match.opponents[0].image !== "None") {
                team1Img = `data:image/png;base64,${match.opponents[0].image}`
            }
        }
    }

    if (match.opponents[1]) {
        if (match.opponents[1] === "TBD") {
            team2 = "TBD"
        } else {
            team2 = match.opponents[1].name
            if (match.opponents[1].image.length > 0 && match.opponents[1].image !== "None") {
                team2Img = `data:image/png;base64,${match.opponents[1].image}`
            }
        }
    }



    if (match.serie) {
        if (match.serie.name !== "None") {
            tournament = match.serie.name
        }

        if (match.serie.image.length > 0) {
            tourImg = `data:image/png;base64,${match.serie.image}`
        }
    }



    const result = match.result
    const tag = match.name


    return {
        id: match.id,
        gameId: match.gameId,
        tag: tag,
        team1: team1,
        img1: team1Img,
        team2: team2,
        img2: team2Img,
        tournament: tournament,
        tourImg: tourImg,
        result: result
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