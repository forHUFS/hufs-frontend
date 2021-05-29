import { Avatar, Button, Comment, List, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import {
  commentLike,
  commentRemove,
  commentReply,
} from '../../_actions/comment_action';
import ReportModal from '../post/ReportModal';
import { UserOutlined } from '@ant-design/icons';
import { postView } from '../../_actions/post_action';
import styles from '../../css/Comment.module.css';
import like from '../../image/recommend.png';
import TextArea from 'antd/lib/input/TextArea';
function CommentList({ comments, history, setPost, match }) {
  const dispatch = useDispatch();
  const onLike = (event) => {
    dispatch(commentLike(+event.target.value))
      .then(async (response) => {
        message.success('추천 완료');
        await postView(+match.params.id).then((response) =>
          setPost(response.payload),
        );
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인이 필요합니다.');
            history.push('/');
            break;
          case 403:
            message.error('접근 권한이 없습니다');
            break;
          case 409:
            message.error('이미 좋아요 한 댓글입니다.');
            break;
          default:
            break;
        }
      });
  };
  const onDelete = (commentId) => {
    dispatch(commentRemove(commentId))
      .then((response) => {
        message.success('삭제 완료');
        dispatch(postView(+match.params.id)).then((response) =>
          setPost(response.payload),
        );
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인이 필요합니다.');
            history.push('/');
            break;
          case 403:
            message.error('접근 권한이 없습니다');
            break;
          default:
            break;
        }
      });
  };

  const onReply = async (content, parentId) => {
    if (content.trim().length === 0) {
      message.info('댓글을 입력하세요');
      return;
    }
    const reply = {
      content: content,
      parentId: parentId,
      postId: +match.params.id,
    };
    dispatch(commentReply(reply)).then((response) => {
      dispatch(postView(+match.params.id)).then((response) => {
        setPost(response.payload);
        let textArray = document.getElementsByTagName('textarea');
        for (let i = 0; i < textArray.length - 1; i++) {
          textArray[i].value = '';
        }
      });
    });
  };
  return (
    <div className="comment-body">
      {comments.map((item) => {
        return (
          item.parentId === null && (
            <Comment
              actions={item.actions}
              author={item.User === null ? '탈퇴한 사용자' : item.User.nickname}
              avatar={<Avatar icon={<UserOutlined />} />}
              content={
                <>
                  {item.content}
                  <div className={styles.commentset}>
                    <Popconfirm
                      title="정말로 댓글을 삭제하시겠습니까?"
                      onConfirm={(e) => onDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                      value={item.id}
                    >
                      <button className={styles.delete} value={item.id}>
                        삭제
                      </button>
                    </Popconfirm>
                    <ReportModal
                      type="comment"
                      id={item.id}
                      history={history}
                    />
                    <img src={like} />
                    <button
                      className={styles.like}
                      value={item.id}
                      onClick={onLike}
                    >
                      {item.like}
                    </button>
                  </div>
                </>
              }
              datetime={item.createAt ? item.createAt.slice(0, 10) : null}
            >
              <span
                style={{ cursor: 'pointer', fontWeight: 'bolder' }}
                onClick={(e) => {
                  let replyView = document.getElementById(`reply-${item.id}`);

                  if (replyView.style.display === 'none') {
                    replyView.style.display = 'block';
                  } else {
                    replyView.style.display = 'none';
                  }
                }}
              >
                대댓글
              </span>

              <div id={`reply-${item.id}`} style={{ display: 'none' }}>
                {comments.map((reply) => {
                  return (
                    reply.parentId === item.id && (
                      <Comment
                        actions={reply.actions}
                        author={
                          reply.User === null
                            ? '탈퇴한 사용자'
                            : reply.User.nickname
                        }
                        avatar={<Avatar icon={<UserOutlined />} />}
                        content={
                          <>
                            {reply.content}
                            <div className={styles.commentset}>
                              <Popconfirm
                                title="정말로 댓글을 삭제하시겠습니까?"
                                onConfirm={(event) => onDelete(reply.id)}
                                okText="Yes"
                                cancelText="No"
                                value={reply.id}
                              >
                                <button
                                  className={styles.delete}
                                  value={reply.id}
                                >
                                  삭제
                                </button>
                              </Popconfirm>
                              <ReportModal
                                type="comment"
                                id={reply.id}
                                history={history}
                              />
                              <img src={like} />
                              <button
                                className={styles.like}
                                value={reply.id}
                                onClick={onLike}
                              >
                                {reply.like}
                              </button>
                            </div>
                          </>
                        }
                        datetime={
                          reply.createAt ? reply.createAt.slice(0, 10) : null
                        }
                      ></Comment>
                    )
                  );
                })}

                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    onReply(e.target[0].value, item.id);
                  }}
                >
                  <TextArea
                    className={styles.commenttextarea}
                    size={'small'}
                    rows={4}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    maxLength={200}
                    type="text"
                    id={item.id}
                    placeholder="댓글을 입력하세요"
                  />
                  <input type="submit" value="댓글 입력" />
                </form>
              </div>
            </Comment>
          )
        );
      })}
    </div>
  );
}

export default withRouter(CommentList);
