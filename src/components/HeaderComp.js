import { useSelector } from "react-redux"
import styled from "styled-components"


const HeaderComp = () => {

    const admin = useSelector(state => state.admin)

    return (
        <Header>
            {admin &&
                <>
                    <img width="64px" height="64px" style={{ borderRadius: "50%" }} src={admin.avatar} alt=" " />
                    <HeaderText>{admin.first_name} {admin.last_name}</HeaderText>
                    <HeaderText>{admin.email}</HeaderText>
                </>

            }
        </Header>
    )
}


const Header = styled.div`
    height: 100px;
    z-index: 10;
    width: 100%;
    box-shadow: 0 0 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const HeaderText = styled.h3`
    font-size: 14px;
    color: black;
`


export default HeaderComp;