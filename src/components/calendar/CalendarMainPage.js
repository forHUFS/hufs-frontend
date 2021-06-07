import React, { useEffect, useState } from 'react';
import { Badge, message } from 'antd';
import { Button, List, Typography } from 'antd';
import { withRouter } from 'react-router';
import { dDayCheck } from './CalendarComponent';
import CalendarComponent from './CalendarComponent';
import useScholarship from '../../hooks/useScholarship';
function CalendarMainPage(props) {
  const { scholarshipData, isError, isLoading } = useScholarship();
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    setDataList(scholarshipData);
  }, [isLoading]);

  if (isLoading) return <>isLoading..</>;
  return (
    <div>
      <div className="site-calendar-demo-card">
        <CalendarComponent
          scholar={scholarshipData ? scholarshipData : null}
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
                onClick={(e) => setDataList(scholarshipData)}
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
