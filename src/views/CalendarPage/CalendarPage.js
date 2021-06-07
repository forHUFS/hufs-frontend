import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Badge, Alert } from 'antd';
import { List, Typography, PageHeader, Tag } from 'antd';
import PostSub from '../../components/post/PostSub';
import axios from 'axios';
import { PUBLIC_IP } from '../../config';
import CalendarComponent, {
  dDayCheck,
} from '../../components/calendar/CalendarComponent';
import useScholarship from '../../hooks/useScholarship';
import useScholarshipTags from '../../hooks/useScholarshipTags';
import Header from '../Header/Header';
import Quick from '../Quick/Quick';

function CalendarPage(props) {
  const [selectedOptionTag, setSelectedOptionTag] = useState({ optionId: [] });
  const [selectedCampusTag, setSelectedCampusTag] = useState({ campusId: [] });
  const { scholarshipData, isError, isLoading } = useScholarship(
    selectedCampusTag,
    selectedOptionTag,
  );
  const { optionTags, campusTags } = useScholarshipTags();
  const { CheckableTag } = Tag;
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    setDataList(scholarshipData);
  }, [isLoading, scholarshipData]);
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

  const onViewAll = async () => {
    await axios
      .post(`${PUBLIC_IP}/scholarship`)
      .then((response) => setDataList(response.data.data));
  };
  return (
    <>
      <Header />
      <Quick />
      <div className="community-main">
        <PostSub match={props.match} />
        <Alert message={`장학금 달력`} />
        <CalendarComponent
          scholar={scholarshipData}
          setDataList={setDataList}
        />
        <div className="scholar-search">
          <div className="scholar-search-type">
            <div className="scholar-search-head">
              캠퍼스
              {campusTags
                ? campusTags.map((tag) => (
                    <CheckableTag
                      key={tag.id}
                      checked={selectedCampusTag.campusId.indexOf(tag.id) > -1}
                      onChange={(event) => onCampusTag(event, tag.id)}
                    >
                      {tag.name}
                    </CheckableTag>
                  ))
                : null}
            </div>
            <div className="scholar-search-head">
              유형
              {optionTags
                ? optionTags.map((tag) => (
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
                  ))
                : null}
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
    </>
  );
}

export default withRouter(CalendarPage);
