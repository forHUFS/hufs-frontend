import { Badge, Calendar } from 'antd';
import React from 'react';
function CalendarComponent({ setDataList, scholar }) {
  function getListData(value) {
    let day = value._d.getUTCDate();
    let month = value._d.getUTCMonth() + 1; //months from 1-12
    let year = value._d.getUTCFullYear();
    const matchedData = scholar.filter((e) => {
      if (e.ScholarshipDate === null) {
        return null;
      } else {
        let x = new Date(e.ScholarshipDate.date);
        return (
          x.getDate() === day &&
          x.getMonth() + 1 === month &&
          x.getFullYear() === year
        );
      }
    });

    return (
      matchedData.map((e) => {
        return { type: 'success', content: e.title.slice(0, 4) };
      }) || []
    );
  }

  function dateCellRender(value) {
    const listData = getListData(value); // getlistdata에서 날짜 별로 데이터를 줘야함
    return (
      <ul className="events">
        {listData.length === 0 ? null : (
          <Badge status={'success'} text={listData.length} />
        )}
      </ul>
    );
  }
  const onSelect = (value) => {
    let selectedDay = value._d.getUTCDate();
    let selectedMonth = value._d.getUTCMonth() + 1; //months from 1-12
    let selectedYear = value._d.getUTCFullYear();
    const selectedMatchedData = scholar.filter((e) => {
      if (e.ScholarshipDate === null) {
        return null;
      } else {
        let x = new Date(e.ScholarshipDate.date);
        return (
          x.getDate() === selectedDay &&
          x.getMonth() + 1 === selectedMonth &&
          x.getFullYear() === selectedYear
        );
      }
    });
    setDataList(selectedMatchedData);
  };

  return (
    <>
      <Calendar
        dateCellRender={scholar ? dateCellRender : null}
        // monthCellRender={monthCellRender}
        fullscreen={false}
        onSelect={scholar ? onSelect : null}
      />
    </>
  );
}

export default CalendarComponent;
