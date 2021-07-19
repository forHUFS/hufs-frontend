import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const CareerReviewView = loadable(() => import('../../components/career/CareerReview/CareerReviewView'));
const CareerNavi = loadable(() => import('../../components/career/CareerNavi'))
const CareerReview = loadable(() => import('../../components/career/CareerReview/CareerReview'));
const CareerQuestion = loadable(() => import('../../components/career/CareerQuestion'));
const CareerInterview = loadable(() => import('../../components/career/CareerInterview'));
const CareerReviewWrite = loadable(() => import('../../components/career/CareerReview/CareerReviewWrite'));
function CareerPage({ match }) {
  return (
    <>
    <Router>
<CareerNavi/>
<div className="Career-Main">
      <Switch>
        <Route exact path={`${match.path}`} component={CareerReview} />
        <Route exact path={`${match.path}/careerReviewWrite`} component={CareerReviewWrite}/>
        <Route exact path={`${match.path}/view/:id`} component={CareerReviewView}/>
        <Route path={`${match.path}/careerQuestion`} component={CareerQuestion} />
          <Route path={`${match.path}/careerInterview`} component={CareerInterview} />
      </Switch>
      </div>
      </Router>

    </>
  );
}

export default CareerPage;
