import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { colors, gameColorList, gameLogoList, gameShadowList } from "../constants/constants";
import "../scss/components/carousel.scss"

const Carousel = forwardRef((props, ref) => {

    const cards = props.cards.matches
    const [activeIdx, setActiveIdx] = useState(Math.floor(cards.length / 2))

    const [show, setShow] = useState([])

    useImperativeHandle(
        ref,
        () => ({
            prevClicked() {
                if (activeIdx > 0) {
                    setActiveIdx(activeIdx - 1)
                }
            },

            nextClicked() {
                if (activeIdx < cards.length - 1) {
                    setActiveIdx(activeIdx + 1)
                }
            }
        })
    )

    useEffect(() => {
        let shownCards = []
        if (activeIdx > 0) {
            shownCards.push({ position: "left", content: cards[activeIdx - 1] })
        }
        shownCards.push({ position: "", content: cards[activeIdx] })

        if (cards.length > activeIdx + 1) {
            shownCards.push({ position: "right", content: cards[activeIdx + 1] })
        }

        setShow(shownCards)
    }, [cards, activeIdx])


    const onLiveCardClicked = (idx) => {
        if ( // active todo
            (idx === 1 && show.length !== 2) ||
            (idx === 1 && activeIdx === cards.length - 1) ||
            (idx === 0 && activeIdx === 0) ||
            (show.length === 1)
        ) {
            console.log("im active")
        } else {
            // inactive
            idx === 0 ? setActiveIdx(activeIdx - 1) : setActiveIdx(activeIdx + 1)
        }
    }

    return (
        <>
            {show.map((item, idx) => {
                const className = `live-card ${item.position}`
                const current = item.content

                // todo maybe we dont have one of the teams
                const team1 = current.opponents[0].name
                const team2 = current.opponents[1].name

                let team1Img = ""
                let team2Img = ""
                const img1Available = current.opponents[0].image.length > 0
                const img2Available = current.opponents[1].image.length > 0
                if (img1Available) {
                    team1Img = `data:image/png;base64,${current.opponents[0].image}`
                }

                if (img2Available) {
                    team2Img = `data:image/png;base64,${current.opponents[1].image}`
                }

                let b64Img = ""
                const imageAvailable = current.serie.image.length > 0
                if (imageAvailable) {
                    b64Img = `data:image/png;base64,${current.serie.image}`
                }

                return (
                    <div key={current.id} className={className} onClick={() => onLiveCardClicked(idx)}>

                        { /* live ui */}
                        <div className="live-details">
                            <div className="tournament-detail">
                                <img
                                    src={imageAvailable ? b64Img : gameLogoList[current.gameId]}
                                    alt={current.id}
                                    className="small-logo"
                                />

                                <div className="live-tournament-title">{current.serie.leagueName}</div>
                            </div>

                            <div className="live-teams-section">
                                <div className="live-team">
                                    <img className="small-logo" src={team1Img} alt={team1} />
                                    <div className="team-title">{team1}</div>
                                </div>

                                <div className="live-result">
                                    {current.result.substring(0, 1)}
                                </div>
                            </div>

                            <div className="live-teams-section">
                                <div className="live-team">
                                    <img className="small-logo" src={team2Img} alt={team2} />
                                    <div className="team-title">{team2}</div>
                                </div>

                                <div className="live-result">
                                    {current.result.substring(2)}
                                </div>
                            </div>

                            <div className="live-tournament-name">{current.name}</div>

                        </div>

                        <div className="live-video">

                        </div>


                    </div>
                )
            })}
        </>
    )

})

export default Carousel