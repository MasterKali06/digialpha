
import axios from "axios"


export const requestMatch = async (gameId, matchMode, matchId) => {

    var response = await axios.get(
        `http://localhost:5000/matches?game=${gameId}&matchMode=${matchMode}&matchId=${matchId}`
    )
    return response.data
}

export const requestTeam = async (gameId, teamId) => {
    var response = await axios.get(
        `http://localhost:5000/teams?game=${gameId}&teamId=${teamId}&page=1`
    )
    return response.data
}