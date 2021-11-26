import csgoLogo from "../assets/images/csgo-logo.png"
import dotaLogo from "../assets/images/dota-logo.png"
import lolLogo from "../assets/images/lol-logo.png"
import valorantLogo from "../assets/images/valorant-logo.png"
import rsiegeLogo from "../assets/images/rsiege-logo.png"
import owLogo from "../assets/images/ow-logo.png"
import codmwLogo from "../assets/images/codmw-logo.png"
import fifaLogo from "../assets/images/fifa-logo.png"

export const BASE_URL = "http://localhost:5000"


export const colors = {
    // main colors
    mainDark: "#20242b",
    firstDark: "#1c2026",
    secondDark: "#181b20",

    mainLight: "#ECEFF4",
    firstLight: "#E5E9F0",
    secondLight: "#D8DEE9",

    lightGrey: "#D3D3D3",
    darkGrey: "#899499",

    frostBlueLight: "#81A1C1",
    frostBlueDark: "#5E81AC",
    frostGreenLight: "#88C0D0",
    frostGreenDark: "#8FBCBB",

    auraRed: "#BF616A",
    auraOrange: "#D08770",
    auraYellow: "#EBCB8B",
    auraGreen: "#A3BE8C",
    auraPurple: "#B48EAD",

    // games
    csgoMain: "#8b493a",

    dotaMain: "#9a130b",

    lolMain: "#1b6a76",
    valorantMain: "#9f3542",
    rsiegeMain: "#5E81AC",
    owMain: "#cd8c2d",
    codmwMain: "#A3BE8C",
    fifaMain: "#4e0f7e"
}


export const gameColorList = [
    colors.csgoMain, colors.dotaMain, colors.lolMain, colors.valorantMain,
    colors.rsiegeMain, colors.owMain, colors.codmwMain, colors.fifaMain
]

export const gameShadowList = [
    "var(--csgo-main)", "var(--dota-main)", "var(--lol-main)", "var(--valorant-main)",
    "var(--rsiege-main)", "var(--ow-main)", "var(--codmw-main)", "var(--fifa-main)"
]

export const gameLogoList = [
    csgoLogo, dotaLogo, lolLogo, valorantLogo,
    rsiegeLogo, owLogo, codmwLogo, fifaLogo
]

export const gameNameList = [
    "Counter Strike", "Dota", "League of legend", "Valorant",
    "Rainbow 6", "Overwatch", "Call of duty", "Fifa"
]
