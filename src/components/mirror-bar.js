import { colors } from "../constants/constants";
import "../scss/components/mirror-bar.scss"

const MirrorBar = ({ percent, name }) => {
    return (
        <div className="mb-container">
            <div className="pc-container">
                <div className="pc-fill" style={{
                    height: `${percent}%`,
                    // backgroundImage: `linear-gradient(45deg, ${colors.frostBlueLight}, ${percent >= 50 ? colors.auraGreen : colors.auraPurple})`
                }}>
                    <div className="curve"></div>
                    <h1>{percent}%</h1>
                </div>
            </div>

            <div className="name-container">
                <h1>{name}</h1>
            </div>
        </div>
    )
}

export default MirrorBar;