import React, { useEffect, useState } from 'react';
import { Badge, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Button, List, Typography } from 'antd';
import { getScholar } from '../../_actions/calender_action';
import { withRouter } from 'react-router';
import { dDayCheck } from './CalendarP';
import moment from 'moment';
import CalendarComponent from './CalendarComponent';
function CalendarMainPage(props) {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [scholar, setscholar] = useState([]);
  useEffect(() => {
    dispatch(getScholar())
      .then((response) => {
        setscholar(response.payload.data);
        const selectedMatchedData = response.payload.data.filter((e) => {
          if (e.ScholarshipDate === null) {
            return null;
          } else {
            let x = moment(e.ScholarshipDate.date);
            let today = moment();
            return (
              // x.date() === today.day() &&
              // x.month() + 1 === today.date() &&
              // x.year() === today.year()
              x.diff(today, 'days') >= 0
            );
          }
        });
        setDataList(selectedMatchedData);
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인하지 않은 사용자');
            props.history.push('/');
            break;
          case 403:
            message.error('접근 권한 오류');
            break;
          default:
            break;
        }
      });
  }, []);

  return (
    <div>
      <div className="site-calendar-demo-card">
        <CalendarComponent
          scholar={scholar ? scholar : null}
          setDataList={setDataList}
        />
      </div>
      <div>
        <List
          style={{ height: '354px' }}
          header={
            <div className="main-Calendar-head">
              <span>장학금</span>
              <Button
                style={{ float: 'right' }}
                type="text"
                onClick={(e) => setDataList(scholar)}
              >
                전체 보기
              </Button>
            </div>
          }
          bordered
          dataSource={dataList}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>[{item.Campus.name}]</Typography.Text>{' '}
              <Typography.Text>[{item.ScholarshipOption.name}]</Typography.Text>{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={(e) => window.open(item.link)}
              >
                {item.title}
              </span>{' '}
              <span style={{ display: 'inline-block', fontWeight: 'bold' }}>
                {item.ScholarshipDate === null
                  ? null
                  : `D ${dDayCheck(item.ScholarshipDate.date)}`}
              </span>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
export default withRouter(CalendarMainPage);
