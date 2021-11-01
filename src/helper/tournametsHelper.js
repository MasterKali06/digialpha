
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
    var date = new Date(parseInt(epoch))
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
}