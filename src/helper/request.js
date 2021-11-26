
import axios from "axios"
import { BASE_URL } from "../constants/constants"


export const requestMatch = async (gameId, matchMode, matchId, source) => {

    var response = await axios.get(
        `${BASE_URL}/matches?game_id=${gameId}&type=${matchMode}&id=${matchId}`,
        { cancelToken: source.token }
    )
    return response.data
}

export const requestTeam = async (gameId, teamId, source) => {
    var response = await axios.get(
        `${BASE_URL}/teams?game=${gameId}&teamId=${teamId}&page=1`,
        { cancelToken: source.token }
    )
    return response.data
}


export const requestHeadToHead = async (gameId, teamOne, teamTwo, source) => {
    var response = await axios.get(
        `${BASE_URL}/headtohead?game_id=${gameId}&team_one=${teamOne}&team_two=${teamTwo}`,
        { cancelToken: source.token }
    )
    return response.data
}


export const requestSerie = async (gameId, id, source) => {
    var response = await axios.get(
        `${BASE_URL}/series?game_id=${gameId}&id=${id}`,
        { cancelToken: source.token }
    )
    return response.data
}

export const requestTournament = async (gameId, id, source) => {
    var response = await axios.get(
        `${BASE_URL}/tournaments?game_id=${gameId}&id=${id}`,
        {cancelToken: source.token}
    )

    return response.data
}