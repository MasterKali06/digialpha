import Navbar from "../components/navbar";


const Layout = ({children}) => {

    return(
        <div style={{
            display: "flex", backgroundColor: "#20242b"
        }}>
            <Navbar></Navbar>
            { children }
        </div>
    )
}

export default Layout;