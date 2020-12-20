import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './App.css';

import Launches from './pages/Launches';
import LaunchDetails from './pages/LaunchDetails';

function App() {
  // You can use match for dynamic generation of urls
  // Useful when nesting long URLs. (Optional for smaller applications)
  const match = useRouteMatch();

  return (
    <div className="app">
      <div className="container">
        <div className="text-center">
          <h1 className="my-3">SpaceX</h1>
          <p className="lead">Welcome to our SpaceX Api application!</p>
        </div>
        <Switch>
          {/* in route paths, especially in Javascript, anything prefixed with a : means it's a variable.
              e.g. :id
          */}
          <Route exact path={`${match.url}launch/:launchId`}>
            <LaunchDetails />
          </Route>
          <Route exact path={match.url}>
            <Launches />
          </Route>
        </Switch>

      </div>
    </div>
  );
}

export default App;
