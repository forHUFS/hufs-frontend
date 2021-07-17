import {
  Avatar,
  Button,
  Comment,
  Dropdown,
  List,
  Menu,
  message,
  Popconfirm,
} from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import ReportModal from '../post/ReportModal';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../../css/Comment.module.css';
import like from '../../image/recommend.png';
import TextArea from 'antd/lib/input/TextArea';
import { LikeOutlined } from '@ant-design/icons';

import { commentRemove, commentSave } from '../../functions/commentFunctions';
import { mutate } from 'swr';
import useErrorHandling from '../../hooks/useErrorHandling';
import { PUBLIC_IP } from '../../config';
import { postCommentLike } from '../../functions/postFunctions';
import useResponsive from '../../hooks/useResponsive';

function CommentList({ comments, history, match }) {
  const { Mobile, Default, isMobile } = useResponsive();
  const [state, setstate] = useState({});
  const errorHandling = useErrorHandling();
  const onLike = (event) => {
    const commentId = +event.target.value;
    postCommentLike('replyId', commentId)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('추천 완료');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
  };
  const onDelete = (commentId) => {
    commentRemove(commentId)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('삭제 완료');
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
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
    commentSave(reply)
      .then(() => {
        mutate(`${PUBLIC_IP}/post/${+match.params.id}`);
        message.success('작성 완료');
        setstate({ ...state, [parentId]: '' });
      })
      .catch((error) => {
        errorHandling(error.response?.data.message);
      });
  };

  const commentMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

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
                  {item.deletedAt ? (
                    '삭제된 댓글입니다.'
                  ) : (
                    <>
                      {' '}
                      {item.content}
                      <Mobile>
                        <div>
                          <span
                            style={{ fontSize: '12px' }}
                            onClick={() => {
                              let replyWrite = document.getElementById(
                                `replyText-${item.id}`,
                              );

                              if (replyWrite.style.display === 'none') {
                                replyWrite.style.display = 'block';
                              } else {
                                replyWrite.style.display = 'none';
                              }
                            }}
                          >
                            답글 쓰기
                          </span>
                          <span style={{ float: 'right' }}>
                            <LikeOutlined />{' '}
                            <button
                              className={styles.like}
                              value={item.id}
                              onClick={onLike}
                            >
                              {item.like}
                            </button>
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Popconfirm
                                    title="정말로 댓글을 삭제하시겠습니까?"
                                    onConfirm={() => onDelete(item.id)}
                                    okText="Yes"
                                    cancelText="No"
                                    value={item.id}
                                  >
                                    <Menu.Item style={{ width: 8 }}>
                                      <span
                                        style={{
                                          marginLeft: 20,
                                        }}
                                        className={'report'}
                                        value={item.id}
                                      >
                                        삭제
                                      </span>
                                    </Menu.Item>
                                  </Popconfirm>

                                  <Menu.Divider />
                                  <Menu.Item>
                                    <ReportModal
                                      type="replyId"
                                      id={item.id}
                                      history={history}
                                    />
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={['click']}
                              placement={'topLeft'}
                            >
                              <MoreOutlined />
                            </Dropdown>
                          </span>
                        </div>
                      </Mobile>
                      <Default>
                        <div className={isMobile ? null : styles.commentset}>
                          <span
                            style={{ fontSize: '12px' }}
                            onClick={() => {
                              let replyWrite = document.getElementById(
                                `replyText-${item.id}`,
                              );

                              if (replyWrite.style.display === 'none') {
                                replyWrite.style.display = 'block';
                              } else {
                                replyWrite.style.display = 'none';
                              }
                            }}
                          >
                            답글 쓰기
                          </span>
                          <Popconfirm
                            title="정말로 댓글을 삭제하시겠습니까?"
                            onConfirm={() => onDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                            value={item.id}
                          >
                            <button
                              style={{ height: '12px' }}
                              className={styles.delete}
                              value={item.id}
                            >
                              삭제
                            </button>
                          </Popconfirm>
                          <ReportModal
                            type="replyId"
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
                        </div>{' '}
                      </Default>

                    </>
                  )}
                </>
              }
              datetime={item.createAt ? item.createAt.slice(0, 10) : null}
            >
              <div id={`reply-${item.id}`}>
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
                            {reply.deletedAt ? (
                              '삭제된 댓글입니다.'
                            ) : (
                              <>
                                {reply.content}
                                <Mobile>
                                  <span style={{ float: 'right' }}>
                                    <LikeOutlined />{' '}
                                    <button
                                      className={styles.like}
                                      value={reply.id}
                                      onClick={onLike}
                                    >
                                      {reply.like}
                                    </button>
                                    <Dropdown
                                      overlay={
                                        <Menu>
                                          <Popconfirm
                                            title="정말로 댓글을 삭제하시겠습니까?"
                                            onConfirm={() => onDelete(reply.id)}
                                            okText="Yes"
                                            cancelText="No"
                                            value={reply.id}
                                          >
                                            <Menu.Item style={{ width: 8 }}>
                                              <span
                                                style={{
                                                  marginLeft: 20,
                                                }}
                                                className={'report'}
                                                value={reply.id}
                                              >
                                                삭제
                                              </span>
                                            </Menu.Item>
                                          </Popconfirm>

                                          <Menu.Divider />
                                          <Menu.Item>
                                            <ReportModal
                                              type="replyId"
                                              id={reply.id}
                                              history={history}
                                            />
                                          </Menu.Item>
                                        </Menu>
                                      }
                                      trigger={['click']}
                                      placement={'topLeft'}
                                    >
                                      <MoreOutlined />
                                    </Dropdown>
                                  </span>
                                </Mobile>
                                <Default>
                                  <div className={styles.commentset}>
                                    <Popconfirm
                                      title="정말로 댓글을 삭제하시겠습니까?"
                                      onConfirm={() => onDelete(reply.id)}
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
                                      type="replyId"
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
                                </Default>
                              </>
                            )}
                          </>
                        }
                        datetime={
                          reply.createAt ? reply.createAt.slice(0, 10) : null
                        }
                      ></Comment>
                    )
                  );
                })}
                <div id={`replyText-${item.id}`} style={{ display: 'none' }}>
                  <TextArea
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
                      minWidth: '4em',
                      height: '46px',
                      position: 'absolute',
                    }}
                    onClick={() => {
                      onReply(state[item.id], item.id);
                    }}
                  >
                    입력
                  </Button>
                </div>
              </div>
            </Comment>
          )
        );
      })}
    </div>
  );
}

export default withRouter(CommentList);
