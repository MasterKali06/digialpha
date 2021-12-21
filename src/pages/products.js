import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import DetailsModal from "../components/DetailModal"
import { PRODUCTS_DETAILS_API } from "../constants/constants"
import { getProductsFromApi, getProducts } from "../redux/actions/getProducts"
import { useState, useEffect } from "react"
import styled from "styled-components"

const Products = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const cancelToken = axios.CancelToken.source()
        dispatch(getProductsFromApi(1, cancelToken))

        return () => cancelToken.cancel()
    }, [])

    const products = useSelector(state => state.products)
    const [productDetails, setProductDetail] = useState(null)
    const [modalStatus, setModalStatus] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const [filterActive, setFilterActive] = useState(false)

    const onFilterBtnClicked = () => {
        const cancelToken = axios.CancelToken.source()

        if (!filterActive) {
            const filteredProducts = products.filter(product => product.year <= 2004)
            dispatch(getProducts(filteredProducts))
        } else {
            dispatch(getProductsFromApi(activePage, cancelToken))
        }
        setFilterActive(!filterActive)

    }

    const onMoreButtonClicked = (id) => {

        axios.get(`${PRODUCTS_DETAILS_API}${id}`)
            .then(res => {
                setProductDetail(res.data.data)
                setModalStatus(true)
            })
            .catch(err => console.log(err))
    }

    const onPageChange = (page) => {
        const cancelToken = axios.CancelToken.source()
        dispatch(getProductsFromApi(page, cancelToken))
        setActivePage(page)
    }

    const onCloseModal = () => {
        setProductDetail(null)
        setModalStatus(false)
    }


    return (
        <MainWrapper>

            {modalStatus && <DetailsModal item={productDetails} type="product" onCloseModal={onCloseModal} />}

            <Body>
                <Table>
                    <thead>
                        <tr>
                            <HeaderColumn>Name</HeaderColumn>
                            <HeaderColumn>Year</HeaderColumn>
                            <HeaderColumn>Color</HeaderColumn>
                            <HeaderColumn>pantone_value</HeaderColumn>
                            <HeaderColumn></HeaderColumn>
                        </tr>
                    </thead>

                    <tbody>
                        {products &&
                            products.map((product, index) => (
                                <Row index={index} key={product.id}>
                                    <Column>{product.name}</Column>
                                    <Column>{product.year}</Column>
                                    <Column>{product.color}</Column>
                                    <Column>{product.pantone_value}</Column>
                                    <Column style={{ cursor: "pointer", color: "green" }} onClick={() => onMoreButtonClicked(product.id)}>more</Column>
                                </Row>

                            ))
                        }
                    </tbody>
                </Table>


            </Body>

            <PaginationWrapper>
                <Button active={activePage === 2} onClick={() => onPageChange(1)}>
                    Previous Page
                </Button>
                <Button active={activePage === 1} onClick={() => onPageChange(2)}>
                    Next Page
                </Button>
                <Button active={!filterActive} onClick={() => onFilterBtnClicked()}>
                    Filter
                </Button>
            </PaginationWrapper>
        </MainWrapper>
    )
}

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

const Table = styled.table`
    position: relative;
    text-align: left;
    width: 80%;
    height: fit-content;
    margin: 0 auto;
    margin-top: 10px;
    display: table;
    padding: 0 0 8em 0;
`

const HeaderColumn = styled.th`
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left:2%;  
    color: var(--frost-blue-dark);
    font-size: 15px;
`


const Column = styled.td`
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left:2%;  
    color: black;
    font-size: 13px;
`


const Row = styled.tr`
    background-color: ${props => (props.index % 2 && "darkgrey") || "white"};
`


export default Products;