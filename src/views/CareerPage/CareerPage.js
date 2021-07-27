import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const CareerReviewView = loadable(() => import('../../components/career/CareerReview/CareerReviewView'));
const CareerNavi = loadable(() => import('../../components/career/CareerNavi'))
const CareerReview = loadable(() => import('../../components/career/CareerReview/CareerReview'));
const CareerQuestion = loadable(() => import('../../components/career/CareerQuestion/CareerQuestion'));
/* const CareerInterview = loadable(() => import('../../components/career/CareerInterview')); */
const CareerReviewWrite = loadable(() => import('../../components/career/CareerReview/CareerReviewWrite'));
const CareerQuestionView = loadable(() => import('../../components/career/CareerQuestion/CareerQuestionView'));
const CareerQuestionWrite = loadable(() => import('../../components/career/CareerQuestion/CareerQuestionWrite'));
const CareerQuestionEdit = loadable(() => import('../../components/career/CareerQuestion/CareerQuestionEdit'))
const CareerReviewEdit = loadable(() => import('../../components/career/CareerReview/CareerReviewEdit'))

function CareerPage({ match }) {
  return (
    <>
    <Router>
<CareerNavi/>
<div className="Career-Main">
      <Switch>
      <Route exact path={`${match.path}`} component={CareerReview} />
      <Route exact path={`${match.path}/취창업공간-후기/write`} component={CareerReviewWrite}/>
      <Route exact path={`${match.path}/취창업공간-후기/view/:id`} component={CareerReviewView}/>
      <Route exact path={`${match.path}/취창업공간-후기/view/:id/edit`} component={CareerReviewEdit}/>
      <Route exact path={`${match.path}/취창업공간-질문`} component={CareerQuestion} />
      <Route exact path={`${match.path}/취창업공간-질문/write`} component={CareerQuestionWrite}/>
      <Route exact path={`${match.path}/취창업공간-질문/view/:id`} component={CareerQuestionView}/>
      <Route exact path={`${match.path}/취창업공간-질문/view/:id/edit`} component={CareerQuestionEdit}/>
         {/*  <Route path={`${match.path}/careerInterview`} component={CareerInterview} /> */}
      </Switch>
      </div>
      </Router>

    </>
  );
}

export default CareerPage;
