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
        <Route exact path={`${match.path}/:id`} component={MajorBoard} />
      </Switch>
    </>
  );
}

export default MajorPage;
