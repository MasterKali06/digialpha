import { Link } from "react-router-dom";
import styled from "styled-components";


const Main = () => {

    return (
        <Body>
            <MLink to="/users">Users</MLink>
            <MLink to="/products">Products</MLink>
            <MLink to="/crypto">Crypto</MLink>
        </Body>
    )
}


const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MLink = styled(Link)`
    font-size: 48px;
    letter-spacing: 3px;
    color: black;
    text-decoration: none;
    margin-top: 10px;
`


export default Main;