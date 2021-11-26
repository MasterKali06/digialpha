import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Main from "./pages/main";
import Calendar from "./pages/calendar/calendar";
import Tournaments from "./pages/tournament/tournaments";
import Teams from "./pages/teams";
import News from "./pages/news";
import Match from "./pages/calendar/match";
import Serie from './pages/tournament/serie';


const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/match" component={Match} />
        <Route path="/serie" component={Serie} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/tournaments" component={Tournaments} />
        <Route path="/teams" component={Teams} />
        <Route path="/news" component={News} />
      </Switch>
    </Router>
  )
}

export default App;
