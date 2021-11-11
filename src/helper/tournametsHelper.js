
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

    let typeUpperLower = {
        upper: [],
        lower: [],
        finals: []
    }
    let typeRound = {
        round64: [],
        round32: [],
        round16: [],
        round8: [],
        round4: [],
        final: []
    }

    let upperLower = false;
    let round = false;

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        if (match.status !== "canceled") {

            if (tour.name.toLowerCase().includes("playoffs")) {

                const name = match.name.toLowerCase()
                if (name.includes("upper") || name.includes("lower")) {
                    upperLower = true
                    round = false
                    break
                } else {
                    round = true
                }
            }

        }
    }


    for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        if (match.status !== "canceled") {

            if (tour.name.toLowerCase().includes("playoffs")) {

                const name = match.name.toLowerCase()

                if (upperLower) {
                    if (name.includes("lower")) {
                        typeUpperLower.lower.push(match)
                    }
                    else if (name.includes("upper")) {
                        typeUpperLower.upper.push(match)
                    }
                    else {
                        typeUpperLower.finals.push(match)
                    }
                }

                else if (round) {
                    if (name.includes("round") || name.includes("final")) {

                        if (name.includes("32")) {
                            typeRound.round32.push(match)
                        }
                        else if (name.includes("16")) {
                            typeRound.round16.push(match)
                        }
                        else if (name.includes("8") || name.includes("quarter")) {
                            typeRound.round8.push(match)
                        }
                        else if (name.includes("4") || name.includes("semi")) {
                            typeRound.round4.push(match)
                        }
                        else if (name.includes("final")) {
                            typeRound.final.push(match)
                        }
                    }
                }
            }
        }
    }
    console.log("upperLower", upperLower)
    console.log("round", round)
    console.log("typeUpperLower", typeUpperLower)
    console.log("typeRound", typeRound)
    if (upperLower) {
        return typeUpperLower
    } else {
        return typeRound
    }
}