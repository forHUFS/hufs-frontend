import React, { useEffect, useState } from 'react';
import { Badge, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { List, Typography, PageHeader, Tag } from 'antd';
import PostSub from '../post/PostSub';
import axios from 'axios';
import { PUBLIC_IP } from '../../config';
import { getScholar } from '../../_actions/calender_action';
import moment from 'moment';
import CalendarComponent from './CalendarComponent';

function CalendarP({ match }) {
  const { CheckableTag } = Tag;
  const dispatch = useDispatch();
  const { scholar } = useSelector((state) => state.calendar);
  const [selectedOptionTag, setSelectedOptionTag] = useState({ optionId: [] });
  const [selectedCampusTag, setSelectedCampusTag] = useState({ campusId: [] });
  const [dataList, setDataList] = useState([]);
  const [optionTagDatas, setOptionTagDatas] = useState([]);
  const [campusTagDatas, setCampusTagDatas] = useState([]);
  useEffect(() => {
    const getSelectedCampusTags =
      selectedCampusTag.campusId.length !== 0 ? selectedCampusTag : null;
    const getSelectedOptionTags =
      selectedOptionTag.optionId.length !== 0 ? selectedOptionTag : null;
    const selectedTags = { ...getSelectedCampusTags, ...getSelectedOptionTags };
    dispatch(getScholar(selectedTags)).then((response) => {
      setDataList(response.payload.data);
      if (Object.keys(selectedTags).length === 0) {
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
      }
    });
  }, [selectedCampusTag, selectedOptionTag]);
  useEffect(async () => {
    await axios.get(`${PUBLIC_IP}/scholarship/option`).then((response) => {
      setOptionTagDatas(response.data.data);
    });
    await axios.get(`${PUBLIC_IP}/scholarship/campus`).then((response) => {
      setCampusTagDatas(response.data.data);
    });
  }, []);
  const onOptionTag = (event, tag) => {
    if (event) {
      setSelectedOptionTag({
        optionId: [...selectedOptionTag.optionId, tag],
      });
    } else {
      setSelectedOptionTag({
        optionId: [...selectedOptionTag.optionId.filter((t) => t !== tag)],
      });
    }
  };
  const onCampusTag = (event, tag) => {
    if (event) {
      setSelectedCampusTag({
        campusId: [...selectedCampusTag.campusId, tag],
      });
    } else {
      setSelectedCampusTag({
        campusId: [...selectedCampusTag.campusId.filter((t) => t !== tag)],
      });
    }
  };

  const onViewAll = () => {
    dispatch(getScholar()).then((response) => {
      setDataList(response.payload.data);
    });
  };
  return (
    <div className="community-main">
      <PostSub match={match} />
      <Alert message={`장학금 달력`} />
      <CalendarComponent
        scholar={scholar ? scholar : null}
        setDataList={setDataList}
      />
      <div className="scholar-search">
        <div className="scholar-search-type">
          <div className="scholar-search-head">
            캠퍼스
            {campusTagDatas.map((tag) => (
              <CheckableTag
                key={tag.id}
                checked={selectedCampusTag.campusId.indexOf(tag.id) > -1}
                onChange={(event) => onCampusTag(event, tag.id)}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
          <div className="scholar-search-head">
            유형
            {optionTagDatas.map((tag) => (
              <CheckableTag
                style={{
                  marginLeft: '12px',
                  marginRight: '0px',
                }}
                key={tag.id}
                checked={selectedOptionTag.optionId.indexOf(tag.id) > -1}
                onChange={(event) => onOptionTag(event, tag.id)}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
        </div>
        <span className="scholar-search-all" onClick={onViewAll}>
          전체 보기
        </span>
      </div>

      <List
        header={
          <div className="scholarhead">
            <div className="s1">디데이</div>
            <div className="s2">주관</div>
            <div className="s3">캠퍼스</div>
            <div className="s4">제목</div>
            <div className="s5">링크</div>
          </div>
        }
        bordered
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item>
            <span style={{ display: 'inline-block', fontWeight: 'bold' }}>
              {item.ScholarshipDate === null
                ? null
                : `D ${dDayCheck(item.ScholarshipDate.date)} `}
            </span>{' '}
            <Typography.Text>[{item.Campus.name}]</Typography.Text>{' '}
            <Typography.Text>[{item.ScholarshipOption.name}]</Typography.Text>{' '}
            {item.title}{' '}
            <h4
              onClick={(e) => window.open(item.link)}
              style={{
                display: 'inline-block',
                float: 'right',
                cursor: 'pointer',
              }}
            >
              링크
            </h4>
          </List.Item>
        )}
      />
    </div>
  );
}
export default CalendarP;

export function dDayCheck(date) {
  const today = moment();
  const dDay =
    today.diff(date, 'days') > 0
      ? `+ ${today.diff(date, 'days')}`
      : `- ${-today.diff(date, 'days')}`;
  return dDay;
}
