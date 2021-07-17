import { List, Typography } from 'antd';
import React from 'react';
import useScholarship from '../../hooks/useScholarship';
import { dDayCheck } from './CalendarComponent';

function CalendarList() {
  const { scholarshipData, isError, isLoading } = useScholarship();

  if (isLoading) {
    return <div> 장학금 불러오는 중..</div>;
  }
  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <List
        style={{ height: '320px' }}
        header={
          <div className="main-Calendar-head">
            <span>장학금</span>
            {/* <Button
                style={{ float: 'right' }}
                type="text"
                onClick={(e) => setDataList(scholarshipData)}
              >
                전체 보기
              </Button> */}
          </div>
        }
        bordered
        dataSource={scholarshipData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>[{item.Campus.name}]</Typography.Text>{' '}
            <Typography.Text>[{item.ScholarshipOption.name}]</Typography.Text>{' '}
            <span

              style={{
                display: 'inline-block',
                fontWeight: 'bold',
                float: 'right',
              }}
            >
              {item.ScholarshipDate === null
                ? null
                : `D ${dDayCheck(item.ScholarshipDate.date)}`}
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={(e) => window.open(item.link)}
            >
              {item.title.substring(0, 18)}...
            </span>{' '}
          </List.Item>
        )}
      />
    </div>
  );
}

export default CalendarList;
