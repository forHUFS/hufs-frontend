import React, { useEffect } from 'react';
import Quick from '../Common/Quick';
import Slide from '../../components/slide/Slide';
import SearchAll from '../../components/post/SearchAll';
import CalendarMainPage from '../../components/calendar/CalendarMainPage';
import styles from '../../css/LandingPage.module.css';
import Popup from '../../components/Popup/Popup'
function LandingPage(props) {
  // const now_url = window.location.href;
  // console.log(now_url);

  return (
    <div>

      <Popup />

      <div className="Main">
        <SearchAll />

        <div
        >
          {/* <Quick id="quick" /> */}
        </div>
        <div className="Mainbanner">

          <Slide />
        </div>
        <div className="MainCalendar">
          <CalendarMainPage />
        </div>
        <div className="board"></div>
      </div>

    </div>
  );
}

export default LandingPage;
