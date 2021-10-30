import React from "react";
import "../scss/pages/teams/teams.scss";
import axios from "axios"
import { useEffect, useState } from "react"


function Teams() {

    const [m, setM] = useState(null)

    useEffect(() => {
        axios.get(
            "http://localhost:5000/matches?teamId=1657&game=1&matchMode=past"
        ).then(
            data => {
                console.log(data.data)
                setM(data.data)
            }
        ).catch(
            err => console.log(err.message)
        )
    }, [])

    if (m) {
        m.sort((a, b) => b.beginAt - a.beginAt)
    }

    return (
        <div >
            {
                m ?
                    m.map(item => {

                        let opp1 = "";
                        let opp2 = "";
                        if (item.opponents[0]) {
                            opp1 = item.opponents[0].name
                        }

                        if (item.opponents[1]) {
                            opp2 = item.opponents[1].name
                        }

                        const date = Date(parseInt(item.beginAt))

                        return (
                            <div>{opp1}  {opp2}  {date}</div>
                        )

                    })
                    : <></>
            }
        </div>
    );
}

export default Teams;