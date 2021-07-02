import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
const ReviewList = loadable(() =>
  import('../../../components/map/reviewSection/newReviewSection/ReviewList'),
);

function ReviewPage(props) {
  return (
    <>
      <Switch>
        {/* <Route path="/register" component={ReviewEdit} /> */}
        {/* <Route exact path={`${props.match.url}/:id`} component={ReviewView} /> */}

        <Route exact path={props.match.url} component={ReviewList} />
        {/* <Route exact path={`${props.match.url}/:id/update`} component={ReviewUpdate} /> */}
      </Switch>
    </>
  );
}

export default ReviewPage;
