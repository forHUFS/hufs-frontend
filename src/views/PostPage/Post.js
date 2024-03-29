import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
import majorAuth from '../../hoc/majorAuth';
const PostEdit = loadable(() => import('../../components/post/PostEdit'));
const PostView = loadable(() => import('../../components/post/PostView'));
const PostList = loadable(() => import('../../components/post/PostList'));
const PostUpdate = loadable(() => import('../../components/post/PostUpdate'));
const MajorList = loadable(() => import('../MajorPage/MajorList'));
function Post({ match }) {
  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={MajorList} />
        <Route exact path={`${match.path}/:title`} component={PostList} />
        <Route exact path={`${match.path}/:title/edit`} component={PostEdit} />
        <Route exact path={`${match.path}/:title/:id`} component={PostView} />
        <Route
          exact
          path={`${match.path}/:title/:id/update`}
          component={PostUpdate}
        />
      </Switch>
    </>
  );
}

export default Post;
