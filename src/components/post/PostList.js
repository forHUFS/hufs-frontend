import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { List, message, Skeleton, Pagination, Spin } from 'antd';
import { Button, Table } from 'antd';
import PostSearch from './PostSearch';
import PostSub from './PostSub';
import useResponsive from '../../hooks/useResponsive';
import { findBoardName } from './PostSub';
import useBoard from '../../hooks/useBoard';
import useErrorHandling from '../../hooks/useErrorHandling';
import useUserInfo from '../../hooks/useUserInfo';
import useMajorCheck from '../../hooks/useMajorCheck';
const { Column } = Table;
function PostList({ match, history }) {
  const { notMyMajor } = useMajorCheck(match);
  const { Mobile, Default } = useResponsive();
  const errorHandling = useErrorHandling();
  const [listPerPage, setListPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const { board, isLoading, isError } = useBoard(match.params.title);
  const { user } = useUserInfo();
  useEffect(() => {
    if (!isError && !isLoading) {
      const postKey = board.map((post, key) => {
        return { ...post, key: key + 1 };
      });
      setPosts(postKey.reverse());
      setloading(true);
    }
  }, [match.params.title, isLoading, board]);

  // const [currentList, setCurrentList] = useState([]);
  // useEffect(() => {
  //   const sliced = posts.slice(firstIndex, lastIndex);
  //   setCurrentList(sliced);
  // }, [posts, currentPage]);
  const lastIndex = currentPage * listPerPage; // 10, 20, 30
  const firstIndex = currentPage * listPerPage - listPerPage; // 1, 11, 21..
  const majorAuthCheck = () => {
    if (notMyMajor) {
      message.warn('주 전공, 이중 전공이 아니시면 글 작성이 불가능합니다.');
      return;
    }
    history.push({
      pathname: `${match.params.title}/edit`,
      state: { detail: match.params.title },
    });
  };
  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Spin style={{ paddingTop: 300 }} tip="로딩 중입니다."></Spin>
      </div>
    );
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  return (
    <>
      <Mobile>
        <div style={{ height: 100 }}>
          <PostSub match={match} />
        </div>
        <div>
          <TableBody
            currentList={posts.slice(firstIndex, lastIndex)}
            match={match}
            loading={loading}
          />
        </div>
        <Button
          style={{ float: 'right', marginTop: 8 }}
          onClick={(e) => {
            majorAuthCheck();
          }}
        >
          글 작성
        </Button>
      </Mobile>
      <Default>
        <table className="community-main">
          <PostSub match={match} />
          <div className="community-box">
            <PostSearch setPosts={setPosts} match={match} />
            <TableBody
              currentList={posts.slice(firstIndex, lastIndex)}
              match={match}
              loading={loading}
            />
            <Button
              className="makepost"
              onClick={(e) => {
                majorAuthCheck();
              }}
            >
              글 작성
            </Button>
            <div className="bottom">
              <Pagination
                className="postpagination"
                defaultCurrent={1}
                total={posts.length}
                onChange={(e) => setCurrentPage(e)}
                pageSize={10}
                showSizeChanger={false}
              />
            </div>
          </div>
        </table>
      </Default>
    </>
  );
}

export default withRouter(PostList);

export function TableBody({ currentList, match, loading }) {
  const { Default, Mobile } = useResponsive();

  return (
    <>
      <Mobile>
        {loading ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={currentList}
              renderItem={(record) => (
                <Link to={`${match.params.title}/${record.id}`}>
                  <List.Item
                    style={{
                      borderBottom: '.5px solid #e6e6e6',
                      width: '100%',
                      wordBreak: 'break-all',
                      wordWrap: 'break-word',
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <>
                          {record.title.length > 25
                            ? record.title.slice(0, 25)
                            : record.title}
                          {/* {true ? record.Replies[0].count : null} */}
                          {record.repliesCount ? (
                            <span style={{ color: 'black' }}>
                              &nbsp;&nbsp;&nbsp;&nbsp;({record.repliesCount})
                            </span>
                          ) : null}
                          { }
                        </>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
            <Column
              render={(text, record) =>
                record.createdAt ? record.createdAt.slice(0, 10) : 'none'
              }
              key="createdAt"
            />
            <Column dataIndex="like" key="like" />{' '}
          </>
        ) : (
          <>
            <Skeleton />
          </>
        )}
      </Mobile>
      <Default>
        {loading ? (
          <Table pagination={false} dataSource={currentList}>
            <Column title="글 번호" dataIndex="key" key="key" />
            <Column
              title="제목"
              key="title"
              render={(text, record) => (
                <Link to={`${match.params.title}/${record.id}`}>
                  {record.title.length > 25
                    ? record.title.slice(0, 25)
                    : record.title}
                  {/* {true ? record.Replies[0].count : null} */}
                  {record.repliesCount ? (
                    <span style={{ color: 'black' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;({record.repliesCount})
                    </span>
                  ) : null}
                </Link>
              )}
            />{' '}
            <Column
              title="작성자"
              render={(text, record) =>
                record.nickname === null ? (
                  <>탈퇴한 사용자</>
                ) : (
                  <>{record.nickname}</>
                )
              }
              key="User"
            />
            <Column
              title="작성일"
              render={(text, record) =>
                record.createdAt ? record.createdAt.slice(0, 10) : 'none'
              }
              key="createdAt"
            />
            <Column title="추천수" dataIndex="like" key="like" />
          </Table>
        ) : (
          <>
            <Skeleton />
          </>
        )}
      </Default>
    </>
  );
}

// 검색 결과용 , 게시판 명 , 유저 이름 받아오도록 변경 .
export function TableBody2({ currentList, match, loading, BoardId }) {
  return (
    <>
      {loading ? (
        <Table pagination={false} dataSource={currentList}>
          {BoardId === undefined ? (
            // 게시판 이름 숫자로 넘어올떄
            <Column
              title="카테고리"
              dataIndex="key"
              key="key"
              render={(text, record) =>
                record.Board?.title ? record.Board.title : null
              }
            />
          ) : (
            <Column
              title="카테고리"
              dataIndex="key"
              key="key"
              render={(text, record) => findBoardName(record.boardId)}
            />
          )}
          <Column
            title="제목"
            key="title"
            render={(text, record) => (
              <Link to={`/board/${match.title}/${record.id}`}>
                {record.title.length > 25
                  ? record.title.slice(0, 25)
                  : record.title}
                {record.Replies.length ? (
                  <span style={{ color: 'black' }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;({record.Replies.length})
                  </span>
                ) : null}
              </Link>
            )}
          />{' '}
          <Column
            title="작성자"
            render={(text, record) =>
              record?.User === null ? (
                <>탈퇴한 사용자</>
              ) : (
                <>{record.User.nickname}</>
              )
            }
            key="User"
          />
          <Column
            title="작성일"
            render={(text, record) =>
              record.createdAt ? record.createdAt.slice(0, 10) : 'none'
            }
            key="createdAt"
          />
          <Column title="추천수" dataIndex="like" key="like" />
        </Table>
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </>
  );
}
