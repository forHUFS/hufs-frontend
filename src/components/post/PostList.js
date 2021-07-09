import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { message, Skeleton, Pagination } from 'antd';
import { Button, Table } from 'antd';
import PostSearch from './PostSearch';
import PostSub from './PostSub';
import { findBoardName } from './PostSub';
import useBoard from '../../hooks/useBoard';
import useErrorHandling from '../../hooks/useErrorHandling';
const { Column } = Table;
function PostList({ match, history }) {
  const errorHandling = useErrorHandling();
  const [listPerPage, setListPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const { board, isLoading, isError } = useBoard(match.path);
  useEffect(() => {
    if (!isError && !isLoading) {
      const postKey = board.map((post, key) => {
        return { ...post, key: key + 1 };
      });
      setPosts(postKey.reverse());
      setloading(true);
    }
  }, [match.path, isLoading, board]);

  // const [currentList, setCurrentList] = useState([]);
  // useEffect(() => {
  //   const sliced = posts.slice(firstIndex, lastIndex);
  //   setCurrentList(sliced);
  // }, [posts, currentPage]);
  const lastIndex = currentPage * listPerPage; // 10, 20, 30
  const firstIndex = currentPage * listPerPage - listPerPage; // 1, 11, 21..

  if (isLoading) return <>loading..</>;
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  return (
    <>
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
            onClick={(e) =>
              history.push({
                pathname: `${match.path}/edit`,
                state: { detail: match.path },
              })
            }
          >
            글 작성
          </Button>
          <div className="bottom">
            <Pagination
              className="postpagination"
              defaultCurrent={currentPage}
              total={posts.length}
              onChange={(e) => setCurrentPage(e)}
              pageSize={listPerPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </table>
    </>
  );
}

export default withRouter(PostList);

export function TableBody({ currentList, match, loading }) {
  return (
    <>
      {loading ? (
        <Table pagination={false} dataSource={currentList}>
          <Column title="글 번호" dataIndex="key" key="key" />
          <Column
            title="제목"
            key="title"
            render={(text, record) => (
              <Link to={`${match.path}/${record.id}`}>
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
              <Link to={`${match.path}/${record.id}`}>
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
