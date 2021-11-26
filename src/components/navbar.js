import { Link } from 'react-router-dom';
import '../scss/components/navbar.scss'
import '../scss/colors.scss'

import { BsCalendarRange } from "react-icons/bs";
import { CgEricsson } from "react-icons/cg"
import { RiTeamFill } from "react-icons/ri"
import { IoNewspaperOutline } from "react-icons/io5"
import { colors, gameColorList, gameLogoList } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { changePageId } from '../redux/actions/changeId';
import {useHistory} from "react-router-dom";
import Tooltip from '../layout/Tooltip';


function Navbar() {

    const gameId = useSelector(state => state.gameId)
    const selectedPage = useSelector(state => state.pageId)
    const dispatch = useDispatch();
    const history = useHistory()


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
                return (
                    <Tooltip content="Calendar" direction="top">
                        <BsCalendarRange className="page-item" style={style(1)} />
                    </Tooltip>
                )
            case 2:
                return (
                    <Tooltip content="Tournaments" direction="top">
                        <CgEricsson className="page-item" style={style(2)} />
                    </Tooltip>
                )
            case 3:
                return (
                    <Tooltip content="Teams" direction="top">
                        <RiTeamFill className="page-item"style={style(3)} />
                    </Tooltip>
                )
            case 4:
                return (
                    <Tooltip content="News" direction="top">
                        <IoNewspaperOutline className="page-item" style={style(4)} />
                    </Tooltip>
                )

            default:
                return (
                        <BsCalendarRange className="page-item" style={style(1)} />
                )
        }
    }


    const navBoxStyle = {
        boxShadow: [
            " 0 0 1px var(--second-dark)",
            "0 0 2px var( --second-dark)",
            "0 0 4px var( --second-dark)",
            "0 0 6px var( --second-dark)",
            // `0 0 7px ${gameShadowList[gameId]}`
        ]
    }

    const setSelectedPage = (id) => {
        dispatch(changePageId(id))
    }

    const mainMenuClicked = () => {
        history.push("/")
    }

    return (

        <div className="navbar" style={navBoxStyle}>
            
            <div data-tip data-for='menu' className="image-holder">
                <Tooltip content="Menu" direction="right" backgroundColor={colors.firstDark} color={colors.mainLight}>
                    <img src={gameLogoList[gameId]} width="48px" height="48px" alt="logo" onClick={mainMenuClicked} />
                </Tooltip>
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