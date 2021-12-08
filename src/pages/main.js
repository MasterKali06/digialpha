import "../scss/main/main.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import HoverVideoPlayer from 'react-hover-video-player';

import csgoVid from '../assets/videos/csgo-main.mp4';
import dotaVid from '../assets/videos/dota-main.mp4';
import lolVid from '../assets/videos/lol-main.mp4';
import valorantVid from '../assets/videos/valorant-main.mp4';
import rsiegeVid from '../assets/videos/rsiege-main.mp4';
import owVid from '../assets/videos/ow-main.mp4';
import codmwVid from '../assets/videos/codmw-main.mp4';
import fifaVid from '../assets/videos/fifa-main.mp4';

import csgoImg from '../assets/images/csgo-img.jpg';
import dotaImg from '../assets/images/dota-img.jpg';
import lolImg from '../assets/images/lol-img.jpg';
import valorantImg from '../assets/images/valorant-img.png';
import rsiegeImg from '../assets/images/rsiege-img.jpg';
import owImg from '../assets/images/ow-img.jpg';
import codmwImg from '../assets/images/codmw-img.jpg';
import fifaImg from '../assets/images/fifa-img.jpg';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeGameId, changePageId } from "../redux/actions/changeId";
import { changePastTourState, changeRunningTourState, changeUpcomingTourState } from "../redux/actions/tourPersistState";
import { getUpcomingSeriesSuccess, getOngoingSeriesSuccess, getPastSeriesSuccess } from "../redux/actions/getSeries";
import Particles from "react-tsparticles";
import config from "../assets/normal-particles.json";

const Main = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  function menuItemClicked() {
    history.push("./calendar")
  }

  useEffect(() => {
    dispatch(changePageId(1))
    dispatch(changePastTourState(false))
    dispatch(changeRunningTourState(false))
    dispatch(changeUpcomingTourState(false))
    dispatch(getUpcomingSeriesSuccess([]))
    dispatch(getPastSeriesSuccess([]))
    dispatch(getOngoingSeriesSuccess([]))
  }, [dispatch])

  const getVariant = (index) => {
    return {
      in: {
        left: "0%",
        transition: {
          delay: (index+1) * 0.3,
        },
      },
      out: {
        left: "1000%",
      }
    };
  };

  const menuItems = [
    { id: 1, name: "csgo", vid: csgoVid, img: csgoImg },
    { id: 2, name: "dota", vid: dotaVid, img: dotaImg },
    { id: 3, name: "lol", vid: lolVid, img: lolImg },
    { id: 4, name: "valorant", vid: valorantVid, img: valorantImg },
    { id: 5, name: "rsiege", vid: rsiegeVid, img: rsiegeImg },
    { id: 6, name: "ow", vid: owVid, img: owImg },
    { id: 7, name: "codmw", vid: codmwVid, img: codmwImg },
    { id: 8, name: "fifa", vid: fifaVid, img: fifaImg },
  ];

  return (
    < div className="menu-body" >
      <Particles params={config} />
      <div className="menu-one">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={item.name}
            initial="out"
            animate="in"
            variants={getVariant(index)}
            duration="0.25s"
            onClick={() => {
              dispatch(changeGameId(index))
              menuItemClicked()
            }}
          >
            <HoverVideoPlayer
              videoSrc={item.vid}
              sizingMode="container"
              style={{
                width: "100%",
                height: "80%",
                disablePictureInPicture: "true"
              }}
              preload="auto"
              pausedOverlay={
                <img className="pause-overlay" src={item.img} alt={item.name} />
              }
            />

          </motion.div>
        ))}
      </div>
    </div >


  );
}

export default Main;
