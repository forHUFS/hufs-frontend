import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter, useLocation } from 'react-router-dom';
import {
  postDellike,
  postLike,
  postRemove,
  postScrap,
  postView,
} from '../../../../_actions/reviewPost_action';
import CommentEdit from '../../../comment/CommentEdit';
import CommentList from '../../../comment/CommentList';
import { Card, PageHeader, Skeleton } from 'antd';
// 상세 게시글 보기
// 게시글 내용 불러오기 ->
function ReviewView({ match, history }) {
  var location = useLocation();
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postView(match.params.id))
      .then((response) => {
        if (response.status === 200) {
          setPost(response.payload);
        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            alert('로그인하지 않은 사용자');
            history.push('/');
            break;
          case 403:
            alert('접근 권한 오류');
            history.push('/');
            break;
          case 404:
            alert('존재하지 않는 게시글입니다');
            history.push('/');
            break;
          default:
            break;
        }
      });
  }, []);
  const onDelete = () => {
    const answer = window.confirm('게시글을 삭제하시겠습니까?');
    if (answer) {
      dispatch(postRemove(post.id))
        .then((response) => {
          if (response.status === 200) {
            alert('게시글 삭제가 완료되었습니다.');
            history.goBack();
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 401:
              alert('로그인하지 않은 사용자');
              history.push('/');
              break;
            case 403:
              alert('접근 권한 오류');
              break;
            case 404:
              alert('존재하지 않는 게시글입니다');
              history.push('/');
              break;
            default:
              break;
          }
        });
    }
  };

  return (
    <div className="community-mai">
      <div className="community-bo">
        <Card
          title={
            <>
              <div style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {post.title}
              </div>

              {post.User === null ? (
                <span style={{ fontSize: '8px' }}> 탈퇴한 사용자 </span>
              ) : (
                <span style={{ fontSize: '8px' }}> {post.User.nickname} </span>
              )}
              <span style={{ marginLeft: '24px', fontSize: '4px' }}>
                {post.createdAt?.slice(0, 10)}
              </span>
            </>
          }
          extra={post.id}
        >
          <div style={{ fontWeight: 'bold', fontSize: '22px' }}>
            {post.score}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ display: 'inline-block', minHeight: '500px' }}
          />
          <div>
            {/* 추천 수: {post.like}
                <div>신고 수: {post.report}</div>
                <div>
                  <span onClick={onLike} style={{ cursor: 'pointer' }}>
                    추천하기
                  </span>
                </div>
                <div>
                  <span onClick={onDellike} style={{ cursor: 'pointer' }}>
                    추천취소
                  </span>
                </div> */}
            <div style={{ fontSize: '12px' }}>
              <div>
                <span
                  onClick={onDelete}
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    marginLeft: '12px',
                  }}
                >
                  삭제하기
                </span>
              </div>{' '}
              {/* <div>
                <span
                  onClick={onScrap}
                  style={{ cursor: 'pointer', float: 'right' }}
                >
                  스크랩하기
                </span>
              </div> */}
              <Link to={`${post.id}/update`}>
                <span>수정하기</span>
              </Link>
            </div>{' '}
          </div>
          <div>
            <hr />
          </div>
          <CommentList
            history={history}
            comments={post.Replies ? post.Replies : []}
          />
          <CommentEdit history={history} match={match} />
        </Card>
      </div>
    </div>
  );
}

export default withRouter(ReviewView);
