import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
const MapContainer = loadable(() =>
  import('../../components/map/mapSection/MapContainer'),
);
const ReviewEdit = loadable(() => import('./Mapdetail/ReviewEdit'));

const ReviewPage = loadable(() => import('./Mapdetail/ReviewPage'));
const ReviewUpdate = loadable(() => import('./Mapdetail/ReviewUpdate'));

function MapPage({ match }) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={MapContainer} />

        <Route
          exact
          path={`${match.path}/store/review/:id/ReviewPage`}
          component={ReviewPage}
        />
        <Route
          exact
          path={`${match.path}/house/review/:id/ReviewPage`}
          component={ReviewPage}
        />
        <Route
          exact
          path={`${match.path}/house/tradee/:id/ReviewPage`}
          component={ReviewPage}
        />
        <Route path={`${match.path}/register`} component={ReviewEdit} />
        <Route exact path={`${match.path}/edit`} component={ReviewUpdate} />

      </Switch>

    </>
    /* jshint ignore:end */
  );
}

export default MapPage;
