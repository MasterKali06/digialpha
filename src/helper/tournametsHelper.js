
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
        console.log("ok", epoch)
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

export const getGroupRankings = (tours) => {
    let res = []
    tours.forEach(element => {
        if (element.name.includes("Group")) {
            res.push(
                { [element.name]: groupRankings(element) }
            )
        }
    })
    return res
}

const groupRankings = (group) => {
    const matches = group.matches
    const teams = group.teams

    let res = []
    teams.forEach(team => {
        res.push(
            { id: team.id, name: team.name, image: team.image, win: 0, draw: 0, lose: 0, gWon: 0, gLose: 0, pts: 0 }
        )
    })
    matches.forEach(match => {
        const opps = match.opponents.split("|")
        const result = match.result.split(":")

        for (let i = 0; i < opps.length; i++) {
            let index = res.findIndex(x => x.id == opps[i])
            let win = res[index].win + (match.winnerId === opps[i] ? 1 : 0)
            let lose = res[index].lose + (match.winnerId !== opps[i] ? 1 : 0)
            let draw = res[index].draw + (result[0] === result[1] ? 1 : 0)
            let gWon = res[index].gWon + parseInt(result[i])
            let gLose = res[index].gLose + parseInt(result[i === 0 ? 1 : 0])
            let pts = win * 3 + draw
            res[index] = {
                id: res[index].id,
                name: res[index].name,
                image: res[index].image,
                win, lose, draw, gWon, gLose, pts
            }
        }
    })
    res.sort((a, b) => b.pts - a.pts)
    return res
}


export const generatePlayoffs = (tour) => {
    const matches = tour.matches
    let sections = [];

    matches.forEach(
        match => {
            if (match.status !== "canceled") {

            }
        })
}