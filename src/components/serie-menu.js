import "../scss/components/serie-menu.scss";
import { colors, gameColorList } from "../constants/constants";
import { useSelector } from "react-redux";
import { useState } from "react"

// icons
import { GoVersions } from "react-icons/go";
import { FaLayerGroup } from "react-icons/fa";
import { GiCheckboxTree } from "react-icons/gi";
import SerieMenuButton from "./serie-menu-button";


const SerieMenu = ({tournaments, activeTabChanged}) => {


    // 0 - overview .. 1 - group .. 2 - playoff
    const [activeTab, setActiveTab] = useState(0)
    const onActiveTabChange = (idx) => {
        setActiveTab(idx)
        activeTabChanged(idx)
    }

    return (
        <div className="serie-menu-body">
            
            <SerieMenuButton
                title="Overview" 
                icon={<GoVersions className="serie-menu-icon" color={colors.firstLight} />} 
                active={activeTab === 0}
                tabClicked={() => onActiveTabChange(0)}
            />
            
            <SerieMenuButton
                title="Group Stage"
                icon={<FaLayerGroup className="serie-menu-icon" color={colors.firstLight} />}
                active={activeTab === 1}
                tabClicked={() => onActiveTabChange(1)}
            />

            <SerieMenuButton
                title="Playoffs"
                icon={<GiCheckboxTree className="serie-menu-icon" color={colors.firstLight} />}
                active={activeTab === 2}
                tabClicked={() => onActiveTabChange(2)}
            />
                    
        </div>
    )
}


export default SerieMenu;