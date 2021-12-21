import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { getUsersFromApi, saveAdmin } from "../redux/actions/getUsers"
import { useEffect, useState } from "react"
import UserProfileCard from "../components/UserProfileCard"
import { USER_DETAILS_API } from "../constants/constants"
import DetailsModal from "../components/DetailModal"
import HeaderComp from "../components/HeaderComp"


const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const cancelToken = axios.CancelToken.source()
        dispatch(getUsersFromApi(1, cancelToken))


        return () => cancelToken.cancel()
    }, [])


    const users = useSelector(state => state.users)

    useEffect(() => {
        const admin = users.find(user => user.email === "emma.wong@reqres.in")
        if (admin) {
            dispatch(saveAdmin(admin))
        }

    }, [users])

    const [userDetail, setUserDetail] = useState(null)
    const [modalStatus, setModalStatus] = useState(false)
    const [activePage, setActivePage] = useState(1)


    const onMoreButtonClicked = (id) => {

        axios.get(`${USER_DETAILS_API}${id}`)
            .then(res => {
                setUserDetail(res.data.data)
                setModalStatus(true)
            })
            .catch(err => console.log(err))
    }

    const onPageChange = (page) => {
        const cancelToken = axios.CancelToken.source()
        dispatch(getUsersFromApi(page, cancelToken))
        setActivePage(page)
    }


    const onCloseModal = () => {
        setUserDetail(null)
        setModalStatus(false)
    }

    return (
        <MainWrapper>

            {modalStatus && <DetailsModal item={userDetail} type="user" onCloseModal={onCloseModal} />}

            <HeaderComp />
            <Body>
                {
                    users.map((user, index) => (
                        <UserProfileCard key={user.id} user={user} onMoreButtonClicked={onMoreButtonClicked} />
                    ))

                }
            </Body>

            <PaginationWrapper>
                <Button active={activePage === 2} onClick={() => onPageChange(1)}>
                    Previous Page
                </Button>
                <Button active={activePage === 1} onClick={() => onPageChange(2)}>
                    Next Page
                </Button>
            </PaginationWrapper>
        </MainWrapper>
    )
}



// // better to save this in a new file
// const UsersUi = () => {

//     const users = useSelector(state => state.users)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         const admin = users.find(user => user.email === "emma.wong@reqres.in")
//         if (admin) {
//             dispatch(saveAdmin(admin))
//         }

//     }, [users])

//     const [userDetail, setUserDetail] = useState(null)
//     const [modalStatus, setModalStatus] = useState(false)
//     const [activePage, setActivePage] = useState(1)

//     const onMoreButtonClicked = (id) => {

//         axios.get(`${USER_DETAILS_API}${id}`)
//             .then(res => {
//                 setUserDetail(res.data.data)
//                 setModalStatus(true)
//             })
//             .catch(err => console.log(err))
//     }

//     const onPageChange = (page) => {
//         const cancelToken = axios.CancelToken.source()
//         dispatch(getUsersFromApi(page, cancelToken))
//         setActivePage(page)
//     }


//     const onCloseModal = () => {
//         setUserDetail(null)
//         setModalStatus(false)
//     }

//     return (
//         <MainWrapper>

//             {modalStatus && <UserDetailModal user={userDetail} onCloseModal={onCloseModal} />}

//             <HeaderComp />
//             <Body>
//                 {
//                     users.map((user, index) => (
//                         <UserProfileCard key={user.id} user={user} onMoreButtonClicked={onMoreButtonClicked} />
//                     ))

//                 }
//             </Body>

//             <PaginationWrapper>
//                 <Button active={activePage === 2} onClick={() => onPageChange(1)}>
//                     Previous Page
//                 </Button>
//                 <Button active={activePage === 1} onClick={() => onPageChange(2)}>
//                     Next Page
//                 </Button>
//             </PaginationWrapper>
//         </MainWrapper>
//     )

// }


/*
    -- styled components
*/

const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: auto;
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px auto;
`

const PaginationWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.h3`
    font-size: 14px;
    color: ${props => ((props.active && "green") || "darkgray")};
    margin-right: 20px;
    margin-bottom: 40px;
    cursor: pointer;
`

export default Users;