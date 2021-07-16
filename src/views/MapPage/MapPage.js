import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
const MapContainer = loadable(() =>
  import('../../components/map/mapSection/MapContainer'),
);
const ReviewEdit = loadable(() => import('./Mapdetail/ReviewEdit'));

const ReviewPage = loadable(() => import('./Mapdetail/ReviewPage'));
const ReviewUpdate = loadable(() => import('./Mapdetail/ReviewUpdate'));
const HouseReview = loadable(() => import('./Mapdetail/HouseReview'));
const HouseReviewUpdate = loadable(() => import('./Mapdetail/HouseTrade'));

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
        <Route path={`${match.path}/store/review/register`} component={ReviewEdit} />
        <Route exact path={`${match.path}/edit`} component={ReviewUpdate} />
        <Route path={`${match.path}/house/register`} component={HouseReview} />
        <Route path={`${match.path}/house/edit`} component={HouseReviewUpdate} />

      </Switch>

    </>
    /* jshint ignore:end */
  );
}

export default MapPage;
