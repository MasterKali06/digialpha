
import axios from "axios"


export const requestMatch = async (gameId, matchMode, matchId, source) => {

    var response = await axios.get(
        `http://localhost:5000/matches?game=${gameId}&matchMode=${matchMode}&matchId=${matchId}`,
        { cancelToken: source.token }
    )
    return response.data
}

export const requestTeam = async (gameId, teamId, source) => {
    var response = await axios.get(
        `http://localhost:5000/teams?game=${gameId}&teamId=${teamId}&page=1`,
        { cancelToken: source.token }
    )
    return response.data
}


export const requestHeadToHead = async (gameId, teamOne, teamTwo, source) => {
    var response = await axios.get(
        `http://localhost:5000/headtohead?game=${gameId}&teamOne=${teamOne}&teamTwo=${teamTwo}`,
        { cancelToken: source.token }
    )
    return response.data
}