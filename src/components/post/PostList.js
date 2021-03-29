import React, { useEffect, useState } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './PostList.css';
import { message, Skeleton } from 'antd';
import { postList } from '../../_actions/post_action';
import { PageHeader, Button, Table, Tag, Input, Space } from 'antd';
import loading from '../../_actions/loading_action';
const { Search } = Input;
const { Column, ColumnGroup } = Table;
function PostList({ match, history }) {
  const [currentList, setCurrentList] = useState([]);
  const [listPerPage, setListPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  // console.log(match.path.substring(1)); // 게시판 이름
  useEffect(() => {
    dispatch(postList(match))
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.payload.reverse());
          setloading(true);
        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 401:
            message.error('로그인하지 않은 사용자');
            history.push('/');
            break;
          case 403:
            message.error('접근 권한 오류');
            history.push('/');
            break;
          default:
            break;
        }
      });
  }, [match.path]);
  useEffect(() => {
    const sliced = posts.slice(firstIndex, lastIndex);
    setCurrentList(sliced);
  }, [currentPage]);

  const lastIndex = currentPage * listPerPage; // 10, 20, 30
  const firstIndex = currentPage * listPerPage - listPerPage; // 1, 11, 21..
  function findBoardName(boardId) {
    switch (boardId) {
      case 1:
        return '떠들어 boo';
      case 2:
        return '학교해 boo';
      case 3:
        return '학교간 boo';
      case 4:
        return '4 게시판';
      case 5:
        return '5 게시판';
      case 6:
        return '6 게시판';
      default:
        break;
    }
  }
  return (
    <>
      {' '}
      {loading ? (
        <table className="community-main">
          {/* <span className="navi"> */}
          <PageHeader
            title={findBoardName(+match.url.substring(1))}
            subTitle="설명"
          />{' '}
          {/* </span>{' '} */}
          <div className="community-box">
            <Button
              onClick={(e) =>
                history.push({
                  pathname: `${match.path}/edit`,
                  state: { detail: match.path },
                })
              }
            >
              글 작성
            </Button>
            <Search
              placeholder="검색창"
              allowClear
              onSearch={(e) => console.log(e)}
              style={{
                float: 'right',
                marginBottom: '10px',
                width: '300px',
                height: '30px',
              }}
            />
            <TableBody
              currentList={posts.slice(firstIndex, lastIndex)}
              match={match}
            />
          </div>
        </table>
      ) : (
        <Skeleton />
      )}
      <div className="bottom">
        <ReactPaginate
          pageCount={Math.ceil(posts.length / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          breakLabel={''}
          previousLabel={'이전'}
          nextLabel={'다음'}
          onPageChange={(event) => setCurrentPage(event.selected + 1)}
          containerClassName={'pagination-ul'}
          activeClassName={'currentPage'}
          previousClassName={'pageLabel-btn'}
          nextClassName={'pageLabel-btn'}
        />
      </div>
    </>
  );
}

export default withRouter(PostList);

export function TableBody({ currentList, match }) {
  return (
    <>
      {loading ? (
        <Table pagination={false} dataSource={currentList}>
          <Column title="-" dataIndex="id" key="id" />
          <Column
            title="제목"
            key="title"
            render={(text, record) => (
              <Link to={`${match.path}/${record.id}`}>
                {record.title.length > 20
                  ? record.title.slice(0, 20)
                  : record.title}
              </Link>
            )}
          />{' '}
          <Column
            title="작성자"
            render={(text, record) =>
              record.User === null ? (
                <>탈퇴한 사용자</>
              ) : (
                <>{record.User.nickname}</>
              )
            }
            // console.log(record);
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
          {' '}
          <Skeleton />
          {/* {console.log(currentList)} */}
        </>
      )}{' '}
    </>
    // <tbody>
    //   {currentList ? (
    //     currentList.map((post, index) => {
    //       return (
    //         <tr key={index}>
    //           <td>{post.title.slice(0, 4)}</td>
    //           <td>
    //             <Link to={`${match.path}/${post.id}`}>{post.content}</Link>
    //           </td>
    //           <td>{post.User === null ? post.User : post.User.nickname}</td>
    //         </tr>
    //       );
    //     })
    //   ) : (
    //     <h2>loading</h2>
    //   )}
    // </tbody>
  );
}
