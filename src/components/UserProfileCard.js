import styled from "styled-components";


const UserProfileCard = ({ user, onMoreButtonClicked }) => {


    return (
        <Body>
            <Image width="96px" height="96px" src={user.avatar} alt=" " />

            <DetailsWrapper>
                <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
                <Button onClick={() => onMoreButtonClicked(user.id)}>more</Button>
            </DetailsWrapper>

        </Body>
    )
}


const Body = styled.div`
    width: 50%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    z-index: 20;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 10px;
`


const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
`

const Image = styled.img`
    border-radius: 50%;
`

const UserName = styled.h3`
    font-size: 14px;
    color: black;
`

// assume that we have a fancy button here :)
const Button = styled.h3`
    font-size: 14px;
    color: black;
    cursor: pointer;

    &:hover{
        color: burlywood;
    }
`

export default UserProfileCard;