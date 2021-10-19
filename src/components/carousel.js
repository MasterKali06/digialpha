import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { colors, gameColorList, gameLogoList, gameShadowList } from "../constants/constants";
import { getMatchesModel } from "../helper/matchesHelper";
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
                const className = props.matchesOpen ? `live-card ${item.position} live-card-transit` : `live-card ${item.position}`
                const current = getMatchesModel(item.content)
                const alterImg = gameLogoList[current.gameId]

                console.log(item.content.streams)

                return (
                    <div key={current.id} className={className} onClick={() => onLiveCardClicked(idx)}>

                        { /* live ui */}
                        <div className="live-details">
                            <div className="tournament-detail">
                                <img
                                    src={current.tourImg ? current.tourImg : alterImg}
                                    alt={current.id}
                                    className="small-logo"
                                />

                                <div className="live-tournament-title">{current.tournament}</div>
                            </div>

                            <div className="live-teams-section">
                                <div className="live-team">
                                    <img className="small-logo" src={current.img1 ? current.img1 : alterImg} alt={current.team1} />
                                    <div className="team-title">{current.team1}</div>
                                </div>

                                <div className="live-result">
                                    {current.result.substring(0, 1)}
                                </div>
                            </div>

                            <div className="live-teams-section">
                                <div className="live-team">
                                    <img className="small-logo" src={current.img2 ? current.img2 : alterImg} alt={current.team2} />
                                    <div className="team-title">{current.team2}</div>
                                </div>

                                <div className="live-result">
                                    {current.result.substring(2)}
                                </div>
                            </div>

                            <div className="live-tournament-name">{current.tag}</div>

                        </div>

                        <div className="live-video">
                            {
                                item.content.streams !== "None" ?
                                    <iframe
                                        className="live-iframe"
                                        src={`${item.content.streams}&localhost`}
                                        frameborder="0"
                                        allowfullscreen="true"
                                        scrolling="no"
                                        height="100%"
                                        width="100%"
                                        title={current.id}>
                                    </iframe>
                                    :
                                    // no live stream
                                    <></>
                            }

                        </div>


                    </div>
                )
            })}
        </>
    )

})

export default Carousel