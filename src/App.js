import "./App.scss";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// pages
import Main from "./pages/main";
import Calendar from "./pages/calendar/calendar";
import Tournaments from "./pages/tournament/tournaments";
import Teams from "./pages/teams";
import News from "./pages/news";
import Match from "./pages/calendar/match";
import Serie from './pages/tournament/serie';


const App = () => {

  const location = useLocation()

  return (
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/" exact component={Main} />
          <Route path="/match" component={Match} />
          <Route path="/serie" component={Serie} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/tournaments" component={Tournaments} />
          <Route path="/teams" component={Teams} />
          <Route path="/news" component={News} />
        </Switch>
      </AnimatePresence>
  )
}

export default App;
