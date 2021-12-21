import { Route, Switch } from "react-router-dom";

//pages
import Users from "./pages/users"
import Products from "./pages/products"
import Crypto from "./pages/crypto"
import Main from "./pages/main"


const App = () => {


  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/users" component={Users} />
      <Route path="/products" component={Products} />
      <Route path="/crypto" component={Crypto} />
    </Switch>
  )
}

export default App;
