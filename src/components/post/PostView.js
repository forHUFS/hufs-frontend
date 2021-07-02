import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CommentEdit from '../comment/CommentEdit';
import CommentList from '../comment/CommentList';
import ReportModal from './ReportModal';
import { Card, message, PageHeader, Popconfirm, Skeleton } from 'antd';
import styles from '../../css/PostView.module.css';
import like from '../../image/recommend.png';
import usePostDetail from '../../hooks/usePostDetail';
import { postDelete, postLike, postScrap } from '../../functions/postFunctions';
import { mutate } from 'swr';
import { PUBLIC_IP } from '../../config';
import useErrorHandling from '../../hooks/useErrorHandling';
// 상세 게시글 보기
// 게시글 내용 불러오기 ->
function PostView({ match, history }) {
  const postId = +match.params.id;
  const { postDetail, isLoading, isError } = usePostDetail(postId);
  const errorHandling = useErrorHandling();

  const onDelete = () =>
    postDelete(postDetail.id)
      .then(() => {
        message.success('게시글 삭제가 완료되었습니다.');
        history.goBack();
      })
      .catch((error) => {
        errorHandling(error.response.data.message);
      });
  const onLike = () => {
    postLike(postDetail.id)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('성공');
      })
      .catch((error) => {
        errorHandling(error.response.data.message);
      });
  };
  const onScrap = async () => {
    postScrap(postDetail.id)
      .then(() => {
        message.success(
          '스크랩에 성공했습니다. 마이페이지에서 확인할 수 있습니다.',
        );
      })
      .catch((error) => {
        errorHandling(error.response.data.message);
      });
  };
  if (isLoading) return <>loading...</>;
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  return (
    <div className={styles.communitymain}>
      <div className={styles.communitybox}>
        <Card
          title={
            <>
              <div style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {postDetail.title}
              </div>
              <span className={styles.like}>
                <img src={like} />
                <span className={styles.recommend} onClick={onLike}>
                  {postDetail.like}
                </span>
              </span>
              <div className={styles.postinfo}>
                {postDetail.User === null ? (
                  <span style={{ fontSize: '8px' }}> 탈퇴한 사용자 </span>
                ) : (
                  <span style={{ fontSize: '13px' }}>
                    {postDetail.User.nickname}
                  </span>
                )}
                <span style={{ marginLeft: '24px', fontSize: '12px' }}>
                  {postDetail.createdAt?.slice(0, 10)}
                </span>
                <span style={{ marginLeft: '24px', fontSize: '12px' }}>
                  글 번호 {postDetail.id}
                </span>
              </div>
            </>
          }
        >
          <div
            dangerouslySetInnerHTML={{ __html: postDetail.content }}
            className="board-content"
          />
          <div>
            <div style={{ fontSize: '12px' }}>
              <ReportModal type="post" id={postDetail.id} history={history} />{' '}
              <div>
                <Popconfirm
                  title="정말로 게시글을 삭제하시겠습니까?"
                  onConfirm={onDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <span
                    style={{
                      cursor: 'pointer',
                      float: 'left',
                      marginRight: '12px',
                    }}
                  >
                    삭제
                  </span>
                </Popconfirm>
                <span
                  onClick={onScrap}
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    marginLeft: '12px',
                  }}
                >
                  스크랩
                </span>
              </div>{' '}
              <Link to={`${postDetail.id}/update`}>
                <span>수정</span>
              </Link>
            </div>{' '}
          </div>
          <div>
            <hr />
          </div>
          <CommentList
            history={history}
            comments={postDetail.Replies ? postDetail.Replies : []}
            match={match}
          />
          <CommentEdit history={history} match={match} />
        </Card>
      </div>
    </div>
  );
}

export default withRouter(PostView);
