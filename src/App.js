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
const CalendarPage = loadable(() =>
  import('./views/CalendarPage/CalendarPage'),
);
const SignUpModal = loadable(() =>
  import('./components/login/modals/SignUpModal'),
);
const Page404 = loadable(() => import('./views/Page404/Page404'));
const EmailAuthPage = loadable(() =>
  import('./views/EmailAuthPage/EmailAuthPage'),
);
const MapPage = loadable(() => import('./views/MapPage/MapPage'));
const SearchPage = loadable(() => import('./views/SearchPage/SearchPage'));
const MajorPage = loadable(() => import('./views/MajorPage/MajorPage'));
const CareerPage = loadable(() => import('./views/CareerPage/CareerPage'))

function App() {
  return (
    <>
      <Router>
        <Header />
        <Quick />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={SignUpModal} />
          <Route exact path="/search" component={SearchPage} />
          <Route path="/1" component={Post} />
          <Route path="/2" component={CalendarPage} />
          <Route path="/3" component={MapPage} />
          <Route path="/4" component={Post} />
          <Route path="/5" component={Post} />
          <Route path="/6" component={Post} />
          
          <Route path="/career" component={CareerPage}/>
          <Route path="/major" component={MajorPage} />
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
