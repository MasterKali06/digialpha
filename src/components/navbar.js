import { Link } from 'react-router-dom';
import '../scss/components/navbar.scss'
import '../scss/colors.scss'

import { BsCalendarRange } from "react-icons/bs";
import { CgEricsson } from "react-icons/cg"
import { RiTeamFill } from "react-icons/ri"
import { IoNewspaperOutline } from "react-icons/io5"
import { useState } from 'react';
import { colors, gameColorList, gameLogoList, gameShadowList } from '../constants/constants';
import { useSelector } from 'react-redux';



function Navbar() {

    const [selectedPage, setSelectedPage] = useState(1)

    const gameId = useSelector(state => state.gameId)


    const pages = [
        { name: '/calendar', id: 1 },
        { name: '/tournaments', id: 2 },
        { name: '/teams', id: 3 },
        { name: '/news', id: 4 }
    ]

    const style = (id) => {
        return {
            color: id === selectedPage ? gameColorList[gameId] : colors.secondLight,
        }
    }

    const PageItem = ({ pageId }) => {
        switch (pageId) {
            case 1:
                return <BsCalendarRange className="page-item" title="calendar" style={style(1)} />

            case 2:
                return <CgEricsson className="page-item" title="tournaments" style={style(2)} />

            case 3:
                return <RiTeamFill className="page-item" title="teams" style={style(3)} />

            case 4:
                return <IoNewspaperOutline className="page-item" title="news" style={style(4)} />

            default:
                return <BsCalendarRange className="page-item" style={style(1)} />
        }
    }


    const navBoxStyle = {
        boxShadow: [
            " 0 0 1px var(--second-dark)",
            "0 0 2px var( --second-dark)",
            `0 0 4px ${gameShadowList[gameId]}`
        ]
    }

    return (

        <div className="navbar" style={navBoxStyle}>
            <div className="image-holder">
                <img src={gameLogoList[gameId]} width="48px" height="48px" alt="logo" />
            </div>


            <div className="navbar-box" >
                {pages.map(page => (
                    <Link key={page.id} to={page.name} onClick={() => setSelectedPage(page.id)}>
                        <PageItem pageId={page.id} />

                    </Link>
                ))}
            </div>

            <div className="image-holder">
                <h1 style={{ fontSize: "14px", color: colors.mainLight }}> site logo </h1>
            </div>
        </div>
    )
}



export default Navbar;