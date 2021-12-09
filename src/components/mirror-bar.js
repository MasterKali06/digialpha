import { colors } from "../constants/constants";
import "../scss/components/mirror-bar.scss";
import { motion } from "framer-motion";


const fillPercentVariant = {
    "in": {
        "y": "100%"
    },
    "out": {
        y: "0",
        transition: {
            duration: 1,
            delay: 0.5
        }
    }
}


const mbVariant = {
    "in": {
        scale: 0
    },
    "out": {
        scale: 1,
        transition: {
            duration: 0.5
        }
    },
    "hover": {
        scale: 1.1,
        transition: {
            duration: 0.3
        }
    }
}


const MirrorBar = ({ percent, name }) => {
    return (
        <motion.div initial="in" animate="out" whileHover="hover" variants={mbVariant} className="mb-container">
            <div className="pc-container">
                <motion.div initial="in" animate="out" variants={fillPercentVariant} className="pc-fill" style={{
                    height: `${percent}%`,
                    backgroundImage: `linear-gradient(45deg, ${colors.frostBlueLight}, ${percent >= 50 ? colors.auraGreen : colors.auraPurple})`
                }}>
                    <h1>{percent}%</h1>
                </motion.div>
            </div>

            <div className="name-container">
                <h1>{name}</h1>
            </div>
        </motion.div>
    )
}

export default MirrorBar;