import Navbar from "../components/navbar";
import { colors } from "../constants/constants";


const Layout = ({children}) => {

    return(
        <div style={{
            display: "flex", backgroundColor: colors.secondDark
        }}>
            <Navbar></Navbar>
            { children }
        </div>
    )
}

export default Layout;