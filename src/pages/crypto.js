import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled from "styled-components";


// for the sake of time i maid this as simple as possible
const Crypto = () => {

    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,tron,ethereum,usdt')

    const [bitcoin, setBitcoin] = useState(null)
    const [tron, setTron] = useState(null)
    const [ethereum, setEthereum] = useState(null)
    const [usdt, setUsdt] = useState(null)

    useEffect(() => {
        socket.onmessage = (msg) => {
            const cryptos = JSON.parse(msg.data)
            "bitcoin" in cryptos && setBitcoin(cryptos.bitcoin)
            "tron" in cryptos && setTron(cryptos.tron)
            "ethereum" in cryptos && setEthereum(cryptos.ethereum)
            "usdt" in cryptos && setUsdt(cryptos.usdt)
        }
    }, [])

    const generateRow = (key, value) => {

        return (
            <Row>{key}:  {value}</Row>
        )
    }

    return (
        <Body>
            {bitcoin && generateRow("bitcoin", bitcoin)}
            {tron && generateRow("tron", tron)}
            {ethereum && generateRow("ethereum", ethereum)}
            {usdt && generateRow("bitcoin", usdt)}
        </Body>
    )
}



const Body = styled.div`
    width: 100%;
    height: 100vh;
    margin-left: 100px;
    margin-top: 100px;
`


const Row = styled.h1`
    font-size: 18px;
    color: black;
`

export default Crypto;