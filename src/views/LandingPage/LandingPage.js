import React, { useEffect } from 'react';
import Quick from '../Common/Quick';
import Slide from '../../components/slide/Slide';
import SearchAll from '../../components/post/SearchAll';
import CalendarMainPage from '../../components/calendar/CalendarMainPage';
import styles from '../../css/LandingPage.module.css';
import Popup from '../../components/Popup/Popup';
import useResponsive from '../../hooks/useResponsive';
import CalendarList from '../../components/calendar/CalendarList';
function LandingPage(props) {
  // const now_url = window.location.href;
  // console.log(now_url);
  const { Mobile, Default } = useResponsive();
<<<<<<< HEAD
=======

>>>>>>> main
  return (
    <>
      <Mobile>
        <SearchAll />
        <CalendarList />
      </Mobile>
      <Default>
        <div>
          <Popup />
          <div className="Main">
            <SearchAll />
            <div className="Mainbanner">
              <Slide />
            </div>
            <div className="MainCalendar">
              <CalendarMainPage />
            </div>
            <div className="board"></div>
          </div>
        </div>
      </Default>
    </>
  );
}

export default LandingPage;
