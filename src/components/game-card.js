import { useSelector } from "react-redux";
import { gameColorList } from "../constants/constants";
import "../scss/components/game-card.scss"


const GameCard = ({ idx, gameCardClicked, isActive }) => {

    var gameId = useSelector(state => state.gameId)

    return (
        <div
            class={`game-btn ${isActive ? "active" : ""}`}
            onClick={() => gameCardClicked()}
        >
            {idx}
        </div>
    )
}


export default GameCard;