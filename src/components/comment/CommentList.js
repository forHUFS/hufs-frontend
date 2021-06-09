import { Avatar, Button, Comment, List, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import ReportModal from '../post/ReportModal';
import { UserOutlined } from '@ant-design/icons';
import styles from '../../css/Comment.module.css';
import like from '../../image/recommend.png';
import TextArea from 'antd/lib/input/TextArea';
import {
  commentLike,
  commentRemove,
  commentReply,
} from '../../functions/commentFunctions';
import { mutate } from 'swr';
import { errorMessage } from '../../functions/errorHandling';
import { PUBLIC_IP } from '../../config';
function CommentList({ comments, history, match }) {
  const [state, setstate] = useState({});
  const onLike = (event) => {
    commentLike(+event.target.value)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('추천 완료');
      })
      .catch((error) => {
        errorMessage(error.response?.data.message);
      });
  };
  const onDelete = (commentId) => {
    commentRemove(commentId)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('삭제 완료');
      })
      .catch((error) => {
        errorMessage(error.response?.data.message);
      });
  };

  const onReply = async (content, parentId) => {
    if (content?.trim().length === 0 || content === undefined) {
      message.info('댓글을 입력하세요');
      return;
    }
    const reply = {
      content: content,
      parentId: parentId,
      postId: +match.params.id,
    };
    commentReply(reply)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('작성 완료');
        setstate({ ...state, [parentId]: '' });
      })
      .catch((error) => {
        errorMessage(error.response?.data.message);
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

                <TextArea
                  id={`replyText-${item.id}`}
                  className={styles.commenttextarea}
                  size={'small'}
                  rows={4}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  maxLength={200}
                  value={state[item?.id]}
                  type="text"
                  placeholder="댓글을 입력하세요"
                  onChange={(e) => {
                    setstate({ ...state, [item.id]: e.target.value });
                  }}
                />
                <Button
                  style={{
                    width: '100px',
                    height: '46px',
                    position: 'absolute',
                  }}
                  onClick={(e) => {
                    onReply(state[item.id], item.id);
                  }}
                >
                  댓글 입력
                </Button>
              </div>
            </Comment>
          )
        );
      })}
    </div>
  );
}

export default withRouter(CommentList);
