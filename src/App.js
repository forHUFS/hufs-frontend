import React from 'react';
import Header from './views/Common/Header';
import Quick from './views/Common/Quick';
import Footer from './views/Common/Footer';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import './css/App2.css';
import './css/Header.css';
import './css/Map.css';
import './css/Post.css';
import './css/Quick.scss';
import './css/Media.css';
import './css/Scholar.css';
import './css/SignInModal.css';
import './css/User.css';
import './css/Slide.css';
import './css/Rule.css';
import './css/Card.css';
import './css/Career.css';
const Post = loadable(() => import('./views/PostPage/Post'));
const LandingPage = loadable(() => import('./views/LandingPage/LandingPage'));
const MyPage = loadable(() => import('./views/MyPage/MyPage'));
const HeaderMenu = loadable(() => import('./components/menubox/HeaderMenu'));
const CalendarPage = loadable(() =>
  import('./views/CalendarPage/CalendarPage'),
);
const SignUpModal = loadable(() => import('./views/RegisterPage/SignUpPage'));
const Page404 = loadable(() => import('./views/Page404/Page404'));
const EmailAuthPage = loadable(() =>
  import('./views/EmailAuthPage/EmailAuthPage'),
);
const MapPage = loadable(() => import('./views/MapPage/MapPage'));
const SearchPage = loadable(() => import('./views/SearchPage/SearchPage'));
const CareerPage = loadable(() => import('./views/CareerPage/CareerPage'));

function App() {
  return (
    <>
      <Router>
        <HeaderMenu />
        <Quick />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={SignUpModal} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/취창업공간" component={CareerPage} />
          <Route path="/board" component={Post} />
          <Route path="/major" component={Post} />
          <Route path="/scholarship" component={CalendarPage} />
          <Route path="/학교간Boo" component={MapPage} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/email" component={EmailAuthPage} />
          <Route path="*" component={Page404} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
