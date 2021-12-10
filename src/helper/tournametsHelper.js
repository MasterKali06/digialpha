
export const arrangeToursByTier = (tours) => {
    let tournaments = {
        s: [],
        a: [],
        b: [],
        c: [],
        d: [],
        z: []
    }
    if (tours.series.length) {
        tours.series.forEach(element => {
            switch (element.tier) {
                case "s":
                    tournaments.s.push(element)
                    break;
                case "a":
                    tournaments.a.push(element)
                    break
                case "b":
                    tournaments.b.push(element)
                    break
                case "c":
                    tournaments.c.push(element)
                    break
                case "d":
                    tournaments.d.push(element)
                    break
                default:
                    tournaments.z.push(element)
            }
        });

        return tournaments
    }

    return null
}



export const formatDate = (epoch) => {
    if (epoch === "None") {
        return null
    }

    const date = new Date(parseInt(epoch))
    const year = date.getFullYear()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()

    if (month.length === 1) {
        month = `0${month}`
    }
    if (day.length === 1) {
        day = `0${day}`
    }

    return `${year}-${month}-${day}`
}


export const getHeadToHeadWinRate = (data, teamOne) => {
    let team1;
    let team2;
    if (data.teamOneWinCount.id == teamOne){
        team1 = data.teamOneWinCount.count
        team2 = data.teamTwoWinCount.count
    }else{
        team1 = data.teamTwoWinCount.count
        team2 = data.teamOneWinCount.count
    }

    const total = team1 + team2

    const teamOnePercent = team1 !== 0 ? team1 / total * 100 : 0
    const teamTwoPercent = team2 !== 0 ? team2 / total * 100 : 0

    return { teamOnePercent, teamTwoPercent }
}