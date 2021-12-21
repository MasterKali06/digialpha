import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DetailsModal = ({ item, type, onCloseModal }) => {

    // not good i know
    if (!item) {
        return <></>
    }

    return (
        <ModalWrapper>
            <Body>
                Details
                <CloseBtn onClick={onCloseModal} />
                {type === "user" ?
                    <>
                        <Row>firstName: {item.first_name}</Row>
                        <Row>lastName: {item.last_name}</Row>
                        <Row>email: {item.email}</Row>
                    </>
                    :
                    <>
                        <Row>name: {item.name}</Row>
                        <Row>name: {item.year}</Row>
                        <Row>name: {item.color}</Row>
                        <Row>name: {item.pantone_value}</Row>
                    </>
                }
            </Body>
        </ModalWrapper>
    )
}


const ModalWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #00000020;
`


const Body = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 300px;
    height: fit-content;
    padding: 20px;
    box-shadow: 0 0 10px;
    z-index: 1000;
    background-color: white;
`

const Row = styled.div`
    color: darkblue;
    font-size: 14px;
`

const CloseBtn = styled(AiOutlineCloseCircle)`
    color: chocolate;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`




export default DetailsModal;