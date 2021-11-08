import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Main from "./pages/main";
import Calendar from "./pages/calendar/calendar";
import Tournaments from "./pages/tournaments"
import Teams from "./pages/teams"
import News from "./pages/news"
import Match from "./pages/match"
import Serie from './pages/serie'

// components
import Navbar from './components/navbar'


const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/match" component={Match} />
        <Route path="/serie" component={Serie} />
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
