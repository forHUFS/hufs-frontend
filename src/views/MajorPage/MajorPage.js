import loadable from '@loadable/component';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

const MajorList = loadable(() => import('./MajorList'));
const MajorBoard = loadable(() => import('./MajorBoard'));

function MajorPage({ match }) {
  return (
    <>
      <Switch>
        <Route exact path={match.path} component={MajorList} />
        <Route exact path={`${match.path}/:major`} component={MajorBoard} />
        <Route exact path={`${match.path}/:major/edit`} component={MajorList} />
        <Route exact path={`${match.path}/:major/:id`} component={MajorBoard} />
        <Route
          exact
          path={`${match.path}/:major/:id/update`}
          component={MajorBoard}
        />
      </Switch>
    </>
  );
}

export default MajorPage;
