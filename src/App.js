import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Main from "./pages/main";
import Calendar from "./pages/calendar";
import Tournaments from "./pages/tournaments"
import Teams from "./pages/teams"
import News from "./pages/news"

// components
import Navbar from './components/navbar'



const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <div className="home">
          <Navbar />
          <Route path="/calendar" component={Calendar} />
          <Route path="/tournaments" component={Tournaments} />
          <Route path="/teams" component={Teams} />
          <Route path="/news" component={News} />
        </div>
      </Switch>
    </Router>
  )
}

export default App;
