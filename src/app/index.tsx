import React from 'react';
import { Switch, Route } from 'react-router';

type RouteProps = {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}

type Props = {
  routes: RouteProps[];
}

const App: React.FC<Props> = ({ routes }: Props) => (
  <Switch>
    {routes.map((route: RouteProps) => (
      <Route
        key={`path-${route.path}`}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ))}
  </Switch>
);

export default App;
